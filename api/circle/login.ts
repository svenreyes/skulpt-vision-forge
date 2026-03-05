import type { VercelRequest, VercelResponse } from "@vercel/node";

const MAX_BODY_SIZE = 2000;

// Temporary: accept any login for preview. Replace with real validation later.
const validateInput = (
  body: Record<string, unknown>
): { valid: boolean; error?: string } => {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }
  return { valid: true };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const bodyString = JSON.stringify(req.body || {});
  if (bodyString.length > MAX_BODY_SIZE) {
    return res.status(413).json({ error: "Request too large" });
  }

  const validation = validateInput(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  // Placeholder
  return res.status(200).json({ success: true });
}
