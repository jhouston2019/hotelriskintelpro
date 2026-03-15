/**
 * Entitlement checks for Hotel Risk Pro
 * Determines what features users can access based on subscription status
 */

import { hasActiveSubscription } from '../billing/stripe';

/**
 * Feature entitlements
 */
const FEATURES = {
  // Free features
  START_ANALYSIS: 'start_analysis',
  VIEW_INITIAL_REPORT: 'view_initial_report',
  VIEW_SUMMARY_METRICS: 'view_summary_metrics',
  
  // Paid features
  SAVE_HOTEL: 'save_hotel',
  EXPORT_PDF: 'export_pdf',
  ACCESS_MONITORING: 'access_monitoring',
  VIEW_FULL_REPORT: 'view_full_report',
  RERUN_ANALYSIS: 'rerun_analysis',
  VIEW_HISTORY: 'view_history',
  QUICK_UPDATES: 'quick_updates',
};

/**
 * Check if user can access feature
 * @param {string} feature
 * @param {string} hotelId
 * @param {string} userId
 * @returns {Object} Entitlement result
 */
export async function canAccess(feature, hotelId, userId) {
  // Free features - always allowed
  const freeFeatures = [
    FEATURES.START_ANALYSIS,
    FEATURES.VIEW_INITIAL_REPORT,
    FEATURES.VIEW_SUMMARY_METRICS,
  ];
  
  if (freeFeatures.includes(feature)) {
    return {
      allowed: true,
      reason: 'free_feature',
    };
  }
  
  // Paid features - check subscription
  if (!hotelId) {
    return {
      allowed: false,
      reason: 'hotel_required',
      message: 'Hotel ID required for this feature',
    };
  }
  
  const hasSubscription = await hasActiveSubscription(hotelId);
  
  if (hasSubscription) {
    return {
      allowed: true,
      reason: 'active_subscription',
    };
  }
  
  return {
    allowed: false,
    reason: 'subscription_required',
    message: 'Active subscription required for this feature',
    feature,
  };
}

/**
 * Check PDF export permission
 * @param {string} hotelId
 * @param {string} userId
 * @returns {boolean}
 */
export async function canExportPDF(hotelId, userId) {
  const result = await canAccess(FEATURES.EXPORT_PDF, hotelId, userId);
  return result.allowed;
}

/**
 * Check monitoring dashboard access
 * @param {string} hotelId
 * @param {string} userId
 * @returns {boolean}
 */
export async function canAccessMonitoring(hotelId, userId) {
  const result = await canAccess(FEATURES.ACCESS_MONITORING, hotelId, userId);
  return result.allowed;
}

/**
 * Check if user can save hotel permanently
 * @param {string} userId
 * @returns {boolean}
 */
export async function canSaveHotel(userId) {
  // Saving requires authentication
  return !!userId;
}

/**
 * Get entitlement summary for hotel
 * @param {string} hotelId
 * @param {string} userId
 * @returns {Object} Entitlements
 */
export async function getEntitlements(hotelId, userId) {
  const hasSubscription = await hasActiveSubscription(hotelId);
  
  return {
    canSave: !!userId,
    canExportPDF: hasSubscription,
    canAccessMonitoring: hasSubscription,
    canRerunAnalysis: hasSubscription,
    canViewHistory: hasSubscription,
    canQuickUpdate: hasSubscription,
    subscriptionRequired: !hasSubscription,
  };
}

module.exports = {
  FEATURES,
  canAccess,
  canExportPDF,
  canAccessMonitoring,
  canSaveHotel,
  getEntitlements,
};
