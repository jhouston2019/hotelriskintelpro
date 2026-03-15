/**
 * Example API endpoint for hotel risk analysis
 * 
 * NOTE: This project is currently configured for static export (output: "export")
 * which does not support API routes. This file is provided as a reference
 * for future server-side implementation.
 * 
 * To use this:
 * 1. Remove `output: "export"` from next.config.js
 * 2. Move this file to pages/api/analyze.js
 * 3. Rebuild the application
 * 
 * POST /api/analyze
 */

import { analyzeHotelRisk } from '../../lib/risk-engine';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const input = req.body;
    
    // Validate minimum required data
    if (!input.hotelProfile?.numberOfRooms) {
      return res.status(400).json({ 
        error: 'Missing required field: numberOfRooms' 
      });
    }
    
    if (!input.financialProfile?.annualGrossRevenue && !input.financialExposure?.annualRevenue) {
      return res.status(400).json({ 
        error: 'Missing required field: annualGrossRevenue' 
      });
    }
    
    // Run analysis
    const analysis = analyzeHotelRisk(input);
    
    // Return full analysis
    return res.status(200).json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({ 
      error: 'Analysis failed',
      message: error.message,
    });
  }
}
