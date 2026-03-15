/**
 * Example API: Upload document
 * 
 * POST /api/upload/document
 * 
 * NOTE: Move to pages/api/upload/document.js when converting to server-side
 */

import { uploadDocument } from '../uploads/storage';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse multipart form data
    // const form = new formidable.IncomingForm()
    // const [fields, files] = await form.parse(req)
    
    const { hotelId, documentType } = req.body;
    const file = req.files?.document;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!hotelId || !documentType) {
      return res.status(400).json({ error: 'Hotel ID and document type required' });
    }

    // Upload document
    const document = await uploadDocument(file, hotelId, documentType);

    return res.status(200).json({
      success: true,
      documentId: document.id,
      fileName: document.fileName,
      parsingStatus: document.parsingStatus,
    });

  } catch (error) {
    console.error('Document upload failed:', error);
    return res.status(500).json({
      error: 'Upload failed',
      message: error.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};
