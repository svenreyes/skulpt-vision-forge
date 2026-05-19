import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminClient } from '../../_lib/supabaseAdmin';
import { AuthError, requireAdmin } from '../../_lib/auth';

// Admin-only endpoint to invite a new Circle member by email.
//
// Body:
//   { email: string, fullName?: string, redirectTo?: string }
//
// Behavior:
//   - Verifies the caller has role='admin'.
//   - Calls supabase.auth.admin.inviteUserByEmail. Supabase sends the invite
//     email with a one-time link. When the user clicks it they land on
//     `redirectTo` (defaults to <site>/circle/accept-invite) where they pick
//     their own password and complete their profile.
//   - On success the auth.users insert trigger creates a `profiles` row.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function resolveSiteOrigin(req: VercelRequest): string {
  const explicit = process.env.SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (explicit) {
    return explicit.startsWith('http') ? explicit : `https://${explicit}`;
  }
  const host = req.headers['x-forwarded-host'] ?? req.headers.host;
  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  return `${proto}://${host}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user: caller } = await requireAdmin(req);

    const body = (req.body ?? {}) as {
      email?: unknown;
      fullName?: unknown;
      redirectTo?: unknown;
    };

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const fullName =
      typeof body.fullName === 'string' ? body.fullName.trim().slice(0, 120) : undefined;
    const explicitRedirect =
      typeof body.redirectTo === 'string' && body.redirectTo.startsWith('http')
        ? body.redirectTo
        : undefined;

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const redirectTo = explicitRedirect ?? `${resolveSiteOrigin(req)}/circle/accept-invite`;

    const admin = getAdminClient();

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: {
        full_name: fullName ?? null,
        invited_by: caller.id,
      },
    });

    if (error) {
      const msg = error.message?.toLowerCase() ?? '';
      // Supabase returns a 422 with this message when the email already has an account.
      if (msg.includes('already been registered') || msg.includes('already registered')) {
        return res.status(409).json({ error: 'That email is already in the Circle.' });
      }
      console.error('[admin/invite] inviteUserByEmail failed', error);
      return res.status(500).json({ error: 'Failed to send invite.' });
    }

    // The trigger creates the profile row. Backfill invited_by / fullName since
    // the trigger only reads raw_user_meta_data.full_name (no invited_by col).
    if (data.user) {
      await admin
        .from('profiles')
        .update({
          full_name: fullName ?? null,
          invited_by: caller.id,
          invited_at: new Date().toISOString(),
        })
        .eq('id', data.user.id);
    }

    return res.status(200).json({
      ok: true,
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error('[admin/invite] unexpected error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
