/**
 * Example API: Fetch dashboard data
 * 
 * GET /api/dashboard/data?hotelId=xxx
 * 
 * NOTE: Move to pages/api/dashboard/data.js when converting to server-side
 */

import { HotelManager, AnalysisManager, AlertManager } from '../db/models';
import { canAccessMonitoring } from '../entitlements';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { hotelId } = req.query;
    const userId = req.session?.userId;

    if (!hotelId) {
      return res.status(400).json({ error: 'Hotel ID required' });
    }

    // Check permission
    const hasPermission = await canAccessMonitoring(hotelId, userId);
    
    if (!hasPermission) {
      return res.status(403).json({
        error: 'Subscription required',
        message: 'Monitoring dashboard requires an active subscription',
      });
    }

    // Fetch hotel data
    const hotel = await HotelManager.getHotelComplete(hotelId);
    
    // Fetch latest analysis
    const latestAnalysis = await AnalysisManager.getLatestAnalysis(hotelId);
    
    // Fetch unread alerts
    const alerts = await AlertManager.getUnreadAlerts(hotelId);
    
    // Calculate renewal countdown
    const policyEndDate = new Date(hotel.insurancePolicy.policyPeriodEnd);
    const today = new Date();
    const daysUntilRenewal = Math.ceil((policyEndDate - today) / (1000 * 60 * 60 * 24));

    return res.status(200).json({
      success: true,
      hotel,
      latestAnalysis,
      alerts,
      daysUntilRenewal,
    });

  } catch (error) {
    console.error('Dashboard data fetch failed:', error);
    return res.status(500).json({
      error: 'Failed to fetch dashboard data',
      message: error.message,
    });
  }
}
