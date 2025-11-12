import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get the webhook URL from environment variable
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('CONTACT_WEBHOOK_URL environment variable is not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Forward the request to Make.com webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Return the response from Make.com
    const data = await response.text();
    
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(response.status).json({ 
        error: 'Webhook request failed',
        details: data 
      });
    }
  } catch (error) {
    console.error('Error forwarding contact form:', error);
    return res.status(500).json({ 
      error: 'Failed to process request',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

