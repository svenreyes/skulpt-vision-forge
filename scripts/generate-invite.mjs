#!/usr/bin/env node
// Generates a Circle invite (or magic link) URL using the Supabase admin API.
// Does NOT send an email — the URL is printed to stdout. Use this to bypass
// the built-in SMTP rate limit while testing.
//
// Usage:
//   node --env-file=.env.local scripts/generate-invite.mjs <email> [type] [redirectTo]
//
// Arguments:
//   email       Required. The recipient's email address.
//   type        Optional. "invite" (default, for a brand-new user) or
//               "magiclink" (for an existing user — useful when invite
//               complains the email is already registered).
//   redirectTo  Optional. Where the link should land after Supabase verifies
//               it. Defaults to http://localhost:8080/circle/accept-invite.
//
// Examples:
//   node --env-file=.env.local scripts/generate-invite.mjs me@example.com
//   node --env-file=.env.local scripts/generate-invite.mjs me@example.com magiclink
//   node --env-file=.env.local scripts/generate-invite.mjs me@example.com invite https://skulptbrand.com/circle/accept-invite

import { createClient } from "@supabase/supabase-js";

const [, , rawEmail, rawType = "invite", rawRedirect] = process.argv;

if (!rawEmail) {
  console.error("Usage: node --env-file=.env.local scripts/generate-invite.mjs <email> [invite|magiclink] [redirectTo]");
  process.exit(1);
}

const email = rawEmail.trim().toLowerCase();
const type = rawType === "magiclink" ? "magiclink" : "invite";
const redirectTo = rawRedirect || "http://localhost:8080/circle/accept-invite";

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !secret) {
  console.error("Missing SUPABASE_URL / SUPABASE_SECRET_KEY. Did you forget --env-file=.env.local?");
  process.exit(1);
}

const admin = createClient(url, secret, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await admin.auth.admin.generateLink({
  type,
  email,
  options: { redirectTo },
});

if (error) {
  console.error(`generateLink(${type}) failed:`, error.message);
  if (type === "invite" && /already.+registered|already.+exists/i.test(error.message)) {
    console.error("\nHint: the email already exists in auth.users. Try:");
    console.error(`  node --env-file=.env.local scripts/generate-invite.mjs ${email} magiclink`);
  }
  process.exit(1);
}

const link = data?.properties?.action_link;
if (!link) {
  console.error("Supabase returned no action_link. Full response:");
  console.error(JSON.stringify(data, null, 2));
  process.exit(1);
}

console.log();
console.log(`type:        ${type}`);
console.log(`email:       ${email}`);
console.log(`redirect_to: ${redirectTo}`);
console.log();
console.log("Click or paste this URL in your browser:");
console.log();
console.log(link);
console.log();
