/**
 * Utility functions for Hotel Risk Pro analysis engine
 */

/**
 * Safely parse a numeric value
 * @param {any} value
 * @returns {number|null}
 */
function parseNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? null : num;
}

/**
 * Format currency for display
 * @param {number|null} value
 * @returns {string}
 */
function formatCurrency(value) {
  if (!value || value === 0) return '$0';
  const num = parseNumber(value);
  if (!num) return '$0';
  
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
}

/**
 * Get nested property value safely
 * @param {Object} obj
 * @param {string} path
 * @returns {any}
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Check if a field exists and has a meaningful value
 * @param {any} value
 * @returns {boolean}
 */
function hasValue(value) {
  if (value === null || value === undefined || value === '') return false;
  if (typeof value === 'number' && isNaN(value)) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  return true;
}

/**
 * Calculate percentage between two numbers
 * @param {number} value
 * @param {number} total
 * @returns {number}
 */
function calculatePercentage(value, total) {
  if (!total || total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Get current year
 * @returns {number}
 */
function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Calculate building age
 * @param {number|null} yearBuilt
 * @returns {number|null}
 */
function calculateBuildingAge(yearBuilt) {
  if (!yearBuilt) return null;
  return getCurrentYear() - yearBuilt;
}

/**
 * Determine if value is within range
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
function isInRange(value, min, max) {
  return value >= min && value <= max;
}

module.exports = {
  parseNumber,
  formatCurrency,
  getNestedValue,
  hasValue,
  calculatePercentage,
  getCurrentYear,
  calculateBuildingAge,
  isInRange,
};
