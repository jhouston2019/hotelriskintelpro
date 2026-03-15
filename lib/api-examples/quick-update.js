/**
 * Example API: Handle quick updates from monitoring dashboard
 * 
 * POST /api/hotel/quick-update
 * 
 * NOTE: Move to pages/api/hotel/quick-update.js when converting to server-side
 */

import { HotelManager, AnalysisManager } from '../db/models';
import { runHotelAnalysis } from '../analysis/orchestrator';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { hotelId, updateType, data, userId } = req.body;

    if (!hotelId || !updateType || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Update appropriate section based on updateType
    switch (updateType) {
      case 'claim':
        // Add new claim to loss_runs
        // await db.lossRuns.create({ hotelId, ...data })
        break;
        
      case 'revenue':
        // Update financial profile
        // await db.financialProfiles.update({ hotelId, annualGrossRevenue: data.annualRevenue })
        break;
        
      case 'property':
        // Update hotel profile or create note
        // await db.hotels.update({ hotelId, notes: data.changes })
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid update type' });
    }

    // Re-run analysis
    const analysisResult = await runHotelAnalysis(hotelId, userId);

    return res.status(200).json({
      success: true,
      message: 'Update saved and analysis re-run',
      analysisId: analysisResult.analysisId,
      analysis: analysisResult.analysis,
    });

  } catch (error) {
    console.error('Quick update failed:', error);
    return res.status(500).json({
      error: 'Update failed',
      message: error.message,
    });
  }
}
