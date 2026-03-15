/**
 * Example API: Save wizard draft progress
 * 
 * POST /api/draft/save
 * 
 * NOTE: Move to pages/api/draft/save.js when converting to server-side
 */

import { DraftManager } from '../db/models';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, section, data } = req.body;

    if (!sessionId || !section || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await DraftManager.saveDraftSection(sessionId, section, data);

    return res.status(200).json({
      success: true,
      savedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Draft save failed:', error);
    return res.status(500).json({
      error: 'Failed to save draft',
      message: error.message,
    });
  }
}
