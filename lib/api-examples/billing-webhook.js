/**
 * Example API: Stripe webhook handler
 * 
 * POST /api/billing/webhook
 * 
 * NOTE: Move to pages/api/billing/webhook.js when converting to server-side
 */

import { processStripeWebhook } from '../billing/stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Process webhook event
    await processStripeWebhook(event);

    return res.status(200).json({ received: true });

  } catch (error) {
    console.error('Webhook processing failed:', error);
    return res.status(500).json({
      error: 'Webhook processing failed',
      message: error.message,
    });
  }
}

// Disable body parsing for Stripe webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};
