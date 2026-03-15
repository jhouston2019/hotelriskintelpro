/**
 * Example API: Run hotel risk analysis
 * 
 * POST /api/analysis/run
 * 
 * NOTE: Move to pages/api/analysis/run.js when converting to server-side
 */

import { runHotelAnalysis } from '../analysis/orchestrator';
import { HotelManager } from '../db/models';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { hotelId, sessionId, userId } = req.body;

    if (!hotelId) {
      return res.status(400).json({ error: 'Hotel ID required' });
    }

    // Verify permission
    const userIdOrSessionId = userId || sessionId;
    if (!userIdOrSessionId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Run analysis
    const result = await runHotelAnalysis(hotelId, userIdOrSessionId);

    return res.status(200).json({
      success: true,
      analysisId: result.analysisId,
      analysis: result.analysis,
    });

  } catch (error) {
    console.error('Analysis failed:', error);
    return res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
    });
  }
}
