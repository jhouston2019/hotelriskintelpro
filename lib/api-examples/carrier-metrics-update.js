/**
 * API Route Example: Carrier Metrics Update
 * Scheduled job to update carrier intelligence metrics
 * 
 * USAGE:
 * 1. Move to pages/api/jobs/carrier-metrics-update.js
 * 2. Set up cron job or cloud scheduler to call this endpoint daily
 * 3. Secure with API key or internal network restriction
 */

import { updateAllCarrierMetrics } from '../../../lib/carrier-intelligence/metrics';

export default async function handler(req, res) {
  // Verify this is a scheduled job (not a user request)
  const authHeader = req.headers.authorization;
  const expectedToken = process.env.CRON_SECRET;
  
  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'This endpoint is for scheduled jobs only',
    });
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('[Carrier Metrics] Starting scheduled update...');
    const startTime = Date.now();
    
    // Update all carrier metrics
    const result = await updateAllCarrierMetrics();
    
    const duration = Date.now() - startTime;
    
    console.log('[Carrier Metrics] Update complete:', {
      carriersUpdated: result.carriersUpdated,
      carriersFailed: result.carriersFailed,
      durationMs: duration,
    });
    
    return res.status(200).json({
      success: true,
      carriersUpdated: result.carriersUpdated,
      carriersFailed: result.carriersFailed,
      durationMs: duration,
      results: result.results,
    });
    
  } catch (error) {
    console.error('[Carrier Metrics] Update failed:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Vercel Cron Jobs:
 *    Add to vercel.json:
 *    {
 *      "crons": [{
 *        "path": "/api/jobs/carrier-metrics-update",
 *        "schedule": "0 2 * * *"
 *      }]
 *    }
 * 
 * 2. AWS Lambda + EventBridge:
 *    - Deploy as Lambda function
 *    - Create EventBridge rule with cron expression: cron(0 2 * * ? *)
 *    - Set CRON_SECRET environment variable
 * 
 * 3. Google Cloud Scheduler:
 *    - Create Cloud Scheduler job
 *    - Target: Your API endpoint
 *    - Schedule: 0 2 * * *
 *    - Add Authorization header with Bearer token
 * 
 * 4. Manual Trigger (for testing):
 *    curl -X POST https://your-domain.com/api/jobs/carrier-metrics-update \
 *      -H "Authorization: Bearer YOUR_CRON_SECRET"
 */
