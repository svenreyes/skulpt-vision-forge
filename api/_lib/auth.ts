import type { VercelRequest } from '@vercel/node';
import type { User } from '@supabase/supabase-js';
import { getAdminClient } from './supabaseAdmin.js';

export interface CircleProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'member' | 'admin';
  accepted_at: string | null;
}

export interface AuthedRequest {
  user: User;
  profile: CircleProfile;
  accessToken: string;
}

function extractBearer(req: VercelRequest): string | null {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string') return null;
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null;
  return token;
}

/**
 * Verifies a request's Authorization: Bearer <jwt> against Supabase Auth and
 * loads the matching `public.profiles` row. Throws a typed error the caller
 * can turn into the right HTTP status.
 */
export async function requireUser(req: VercelRequest): Promise<AuthedRequest> {
  const accessToken = extractBearer(req);
  if (!accessToken) {
    throw new AuthError(401, 'Missing bearer token.');
  }

  const admin = getAdminClient();

  // `getUser(jwt)` verifies the JWT signature and returns the user, without
  // needing the user's own session client.
  const { data: userData, error: userError } = await admin.auth.getUser(accessToken);
  if (userError || !userData.user) {
    throw new AuthError(401, 'Invalid or expired session.');
  }

  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select('id, email, full_name, role, accepted_at')
    .eq('id', userData.user.id)
    .single();

  if (profileError || !profile) {
    throw new AuthError(403, 'No Circle profile for this user.');
  }

  return {
    user: userData.user,
    profile: profile as CircleProfile,
    accessToken,
  };
}

export async function requireAdmin(req: VercelRequest): Promise<AuthedRequest> {
  const authed = await requireUser(req);
  if (authed.profile.role !== 'admin') {
    throw new AuthError(403, 'Admin access required.');
  }
  return authed;
}

export class AuthError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}
