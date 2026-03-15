/**
 * Example API: Create Stripe checkout session
 * 
 * POST /api/billing/create-checkout
 * 
 * NOTE: Move to pages/api/billing/create-checkout.js when converting to server-side
 */

import { createCheckoutSession } from '../billing/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, hotelId, planType } = req.body;

    if (!userId || !hotelId) {
      return res.status(400).json({ error: 'User ID and Hotel ID required' });
    }

    if (!['monthly', 'yearly'].includes(planType)) {
      return res.status(400).json({ error: 'Invalid plan type' });
    }

    const session = await createCheckoutSession(userId, hotelId, planType);

    return res.status(200).json({
      success: true,
      sessionId: session.sessionId,
      url: session.url,
    });

  } catch (error) {
    console.error('Checkout creation failed:', error);
    return res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message,
    });
  }
}
