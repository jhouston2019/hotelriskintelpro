/**
 * API endpoint for hotel risk analysis
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
