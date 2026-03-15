/**
 * Example API: Export PDF report
 * 
 * GET /api/pdf/export?analysisId=xxx
 * 
 * NOTE: Move to pages/api/pdf/export.js when converting to server-side
 */

import { streamPDFToResponse } from '../pdf/generator';
import { canExportPDF } from '../entitlements';
import { AnalysisManager } from '../db/models';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { analysisId } = req.query;
    const userId = req.session?.userId; // Assumes session middleware

    if (!analysisId) {
      return res.status(400).json({ error: 'Analysis ID required' });
    }

    // Fetch analysis
    const analysis = await AnalysisManager.getAnalysis(analysisId);
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    // Check permission
    const hasPermission = await canExportPDF(analysis.hotelId, userId);
    
    if (!hasPermission) {
      return res.status(403).json({ 
        error: 'Subscription required',
        message: 'PDF export requires an active subscription',
      });
    }

    // Generate and stream PDF
    await streamPDFToResponse(res, analysisId, userId);

  } catch (error) {
    console.error('PDF export failed:', error);
    return res.status(500).json({
      error: 'PDF export failed',
      message: error.message,
    });
  }
}
