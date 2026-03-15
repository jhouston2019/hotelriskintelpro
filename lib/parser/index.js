/**
 * Document parsing integration for Hotel Risk Pro
 * 
 * This module handles parsing of insurance policies and loss runs.
 * Actual implementation will integrate with OCR/parsing services.
 */

/**
 * Parse insurance policy document
 * @param {string} documentId
 * @param {string} storagePath
 * @returns {Object} Parsed policy data
 */
export async function parsePolicyDocument(documentId, storagePath) {
  try {
    // Download document from storage
    // const fileBuffer = await downloadFile(storagePath)
    
    // Send to parsing service (OCR, AI extraction, etc.)
    // const extracted = await parsingService.extractPolicy(fileBuffer)
    
    // Normalize extracted data
    const parsedData = {
      carrier: null,
      policyPeriodStart: null,
      policyPeriodEnd: null,
      propertyLimit: null,
      businessInterruptionLimit: null,
      liabilityLimit: null,
      deductible: null,
      // ... other fields
      
      // Metadata
      confidence: 0.75, // Overall confidence score
      fieldConfidence: {
        carrier: 0.95,
        propertyLimit: 0.85,
        // ... per-field confidence
      },
      unparsedFields: ['biRestorationPeriodMonths', 'ordinanceLawCoverage'],
    };
    
    // Save parsed data to database
    // await DocumentManager.updateParsedData(documentId, parsedData, parsedData.confidence)
    
    return {
      success: true,
      data: parsedData,
      confidence: parsedData.confidence,
      unparsedFields: parsedData.unparsedFields,
    };
    
  } catch (error) {
    console.error('Policy parsing failed:', error);
    
    // Save parsing failure status
    // await DocumentManager.updateParsedData(documentId, null, 0)
    
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
}

/**
 * Parse loss runs document
 * @param {string} documentId
 * @param {string} storagePath
 * @returns {Object} Parsed claims data
 */
export async function parseLossRunsDocument(documentId, storagePath) {
  try {
    // Download document
    // const fileBuffer = await downloadFile(storagePath)
    
    // Parse based on file type
    // const extracted = await parsingService.extractLossRuns(fileBuffer)
    
    // Normalize to claim array
    const parsedClaims = [
      {
        claimYear: 2024,
        claimType: 'Water',
        causeOfLoss: 'Roof leak',
        amountPaid: 85000,
        status: 'Closed',
        confidence: 0.90,
      },
      // ... more claims
    ];
    
    return {
      success: true,
      claims: parsedClaims,
      totalClaims: parsedClaims.length,
      confidence: 0.85,
    };
    
  } catch (error) {
    console.error('Loss runs parsing failed:', error);
    
    return {
      success: false,
      error: error.message,
      claims: [],
    };
  }
}

/**
 * Merge parsed data with manual edits
 * @param {Object} manualData
 * @param {Object} parsedData
 * @returns {Object} Merged data with source tracking
 */
export function mergeParsedAndManual(manualData, parsedData) {
  const merged = {};
  
  // For each field, prefer manual over parsed
  Object.keys(parsedData || {}).forEach(key => {
    if (key === 'confidence' || key === 'fieldConfidence' || key === 'unparsedFields') {
      return; // Skip metadata fields
    }
    
    if (manualData[key] !== null && manualData[key] !== undefined && manualData[key] !== '') {
      // Manual value exists - use it
      merged[key] = {
        value: manualData[key],
        source: 'manual',
      };
    } else if (parsedData[key] !== null && parsedData[key] !== undefined) {
      // Use parsed value
      merged[key] = {
        value: parsedData[key],
        source: 'parsed',
        confidence: parsedData.fieldConfidence?.[key] || parsedData.confidence,
      };
    }
  });
  
  // Add any manual-only fields
  Object.keys(manualData || {}).forEach(key => {
    if (!merged[key] && manualData[key] !== null && manualData[key] !== undefined && manualData[key] !== '') {
      merged[key] = {
        value: manualData[key],
        source: 'manual',
      };
    }
  });
  
  return merged;
}

/**
 * Extract values from merged data (remove source metadata)
 * @param {Object} mergedData
 * @returns {Object} Clean values
 */
export function extractValues(mergedData) {
  const values = {};
  Object.keys(mergedData).forEach(key => {
    if (mergedData[key]?.value !== undefined) {
      values[key] = mergedData[key].value;
    } else {
      values[key] = mergedData[key];
    }
  });
  return values;
}

/**
 * Trigger parsing job (async)
 * @param {string} documentId
 */
async function triggerParsingJob(documentId) {
  // Queue parsing job
  // await parsingQueue.add({ documentId })
}

module.exports = {
  parsePolicyDocument,
  parseLossRunsDocument,
  mergeParsedAndManual,
  extractValues,
};
