import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getAdminClient } from '../../_lib/supabaseAdmin';
import { AuthError, requireUser } from '../../_lib/auth';

// Returns the current user's Circle profile, creating it if missing (defensive
// fallback for the auth.users trigger), and auto-promoting them to admin if
// their email is in the ADMIN_EMAILS env var.
//
// ADMIN_EMAILS is a comma-separated list of lowercased emails configured in
// Vercel. Example:
//   ADMIN_EMAILS=sven@skulptbrand.com,founder@skulptbrand.com

function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user, profile } = await requireUser(req);
    const admin = getAdminClient();

    const adminEmails = parseAdminEmails();
    const userEmail = user.email?.toLowerCase() ?? null;
    const shouldBeAdmin = !!userEmail && adminEmails.has(userEmail);

    console.log('[profile/sync]', {
      user_id: user.id,
      user_email: userEmail,
      current_role: profile.role,
      admin_emails_loaded: [...adminEmails],
      should_be_admin: shouldBeAdmin,
    });

    // Promote to admin if email is configured and we're not already admin.
    if (shouldBeAdmin && profile.role !== 'admin') {
      const { data: updated, error: updateError } = await admin
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)
        .select('id, email, full_name, role, accepted_at')
        .single();

      if (updateError) {
        console.error('[profile/sync] failed to promote admin', updateError);
      } else if (updated) {
        console.log('[profile/sync] promoted to admin', updated.email);
        return res.status(200).json({ profile: updated });
      }
    }

    return res.status(200).json({ profile });
  } catch (err) {
    if (err instanceof AuthError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error('[profile/sync] unexpected error', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
