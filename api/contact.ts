import type { VercelRequest, VercelResponse } from '@vercel/node';

// Maximum request body size (5KB)
const MAX_BODY_SIZE = 5000;

// Validate webhook URL format (Make.com webhooks)
const isValidWebhookUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && 
           (urlObj.hostname.includes('make.com') || urlObj.hostname.includes('hook.eu1.make.com') || urlObj.hostname.includes('hook.us1.make.com'));
  } catch {
    return false;
  }
};

// Basic input validation schema
const validateInput = (body: any): { valid: boolean; error?: string } => {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  // Check required fields
  const required = ['name', 'email', 'projectName', 'projectLink', 'stage', 'investmentLevel', 'whyNow', 'biggestChallenges'];
  for (const field of required) {
    if (!body[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  // Validate string lengths
  if (typeof body.name !== 'string' || body.name.length > 100) {
    return { valid: false, error: 'Invalid name field' };
  }
  if (typeof body.email !== 'string' || body.email.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { valid: false, error: 'Invalid email field' };
  }
  if (typeof body.projectName !== 'string' || body.projectName.length > 150) {
    return { valid: false, error: 'Invalid projectName field' };
  }
  if (typeof body.projectLink !== 'string' || body.projectLink.length > 500) {
    return { valid: false, error: 'Invalid projectLink field' };
  }
  if (typeof body.whyNow !== 'string' || body.whyNow.length > 1000) {
    return { valid: false, error: 'Invalid whyNow field' };
  }
  if (!Array.isArray(body.biggestChallenges) || body.biggestChallenges.length === 0) {
    return { valid: false, error: 'Invalid biggestChallenges field' };
  }

  // Validate enum values
  const validStages = ['idea', 'mvp', 'funded', 'pivoting'];
  if (!validStages.includes(body.stage)) {
    return { valid: false, error: 'Invalid stage value' };
  }

  const validInvestmentLevels = ['high', 'moderate', 'light', 'later'];
  if (!validInvestmentLevels.includes(body.investmentLevel)) {
    return { valid: false, error: 'Invalid investmentLevel value' };
  }

  return { valid: true };
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check request body size
  const bodyString = JSON.stringify(req.body || {});
  if (bodyString.length > MAX_BODY_SIZE) {
    return res.status(413).json({ error: 'Request too large' });
  }

  // Validate input
  const validation = validateInput(req.body);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error || 'Invalid input data' });
  }

  // Get the webhook URL from environment variable
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('CONTACT_WEBHOOK_URL environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Validate webhook URL format
  if (!isValidWebhookUrl(webhookUrl)) {
    console.error('Invalid webhook URL format');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Forward the request to Make.com webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: bodyString,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Return the response from Make.com
    const data = await response.text();
    
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      // Log full error server-side, but return generic message to client
      console.error('Webhook request failed:', { 
        status: response.status, 
        statusText: response.statusText,
        data: data.substring(0, 200) // Log first 200 chars only
      });
      return res.status(500).json({ 
        error: 'Failed to process request. Please try again later.'
      });
    }
  } catch (error) {
    // Handle timeout and other errors
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Webhook request timeout');
      return res.status(504).json({ error: 'Request timeout. Please try again later.' });
    }
    
    console.error('Error forwarding contact form:', error instanceof Error ? error.message : 'Unknown error');
    return res.status(500).json({ 
      error: 'Failed to process request. Please try again later.'
    });
  }
}

