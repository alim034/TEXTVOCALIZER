import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gTTS from 'gtts';
import { body, validationResult } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get current file directory (for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create audio directory if it doesn't exist
const audioDir = path.join(__dirname, '../audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

// @desc    Convert text to speech
// @route   POST /api/tts/convert
// @access  Private
router.post('/convert', protect, [
  body('text')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Text must be between 1 and 1000 characters'),
  body('language')
    .optional()
    .isIn(['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'ja', 'ko', 'zh'])
    .withMessage('Invalid language code')
], async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { text, language = 'en' } = req.body;
    const userId = req.user.id;
    
    // Generate unique filename
    const timestamp = Date.now();
    const filename = `tts_${userId}_${timestamp}.mp3`;
    const filePath = path.join(audioDir, filename);

    // Create gTTS instance
    const gtts = new gTTS(text, language);

    // Save audio file
    await new Promise((resolve, reject) => {
      gtts.save(filePath, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    // Return audio file URL
    const audioUrl = `/api/tts/audio/${filename}`;
    
    res.json({
      success: true,
      message: 'Text converted to speech successfully',
      audioUrl,
      filename,
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      language
    });

    // Clean up old files (older than 1 hour)
    setTimeout(() => {
      cleanupOldFiles();
    }, 1000);

  } catch (error) {
    console.error('TTS Conversion Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to convert text to speech'
    });
  }
});

// @desc    Serve audio files
// @route   GET /api/tts/audio/:filename
// @access  Private
router.get('/audio/:filename', protect, (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(audioDir, filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Audio file not found'
      });
    }

    // Verify file belongs to the user (basic security check)
    const userId = req.user.id;
    if (!filename.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Set appropriate headers
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    fileStream.on('error', (error) => {
      console.error('File streaming error:', error);
      res.status(500).json({
        success: false,
        message: 'Error streaming audio file'
      });
    });

  } catch (error) {
    console.error('Audio serve error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user's TTS history
// @route   GET /api/tts/history
// @access  Private
router.get('/history', protect, (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get all audio files for the user
    const files = fs.readdirSync(audioDir)
      .filter(filename => filename.includes(userId) && filename.endsWith('.mp3'))
      .map(filename => {
        const filePath = path.join(audioDir, filename);
        const stats = fs.statSync(filePath);
        
        return {
          filename,
          url: `/api/tts/audio/${filename}`,
          createdAt: stats.birthtime,
          size: stats.size
        };
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10); // Return latest 10 files

    res.json({
      success: true,
      history: files
    });

  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch history'
    });
  }
});

// Cleanup function to remove old audio files
const cleanupOldFiles = () => {
  try {
    const files = fs.readdirSync(audioDir);
    const oneHourAgo = Date.now() - (60 * 60 * 1000); // 1 hour in milliseconds

    files.forEach(filename => {
      const filePath = path.join(audioDir, filename);
      const stats = fs.statSync(filePath);
      
      if (stats.birthtime.getTime() < oneHourAgo) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up old file: ${filename}`);
      }
    });
  } catch (error) {
    console.error('Cleanup error:', error);
  }
};

export default router;
