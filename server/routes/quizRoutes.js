const express = require('express');
const router = express.Router();
const Quiz = require('../model/Quiz');
const Analytics = require('../model/Analytics');

// Handle quiz completion
router.post('/complete', async (req, res) => {
  const { quizId, userId, score, answers } = req.body;

  try {
    // Update or create analytics record
    let analytics = await Analytics.findOne({ quizId });
    if (analytics) {
      // Update existing analytics
      analytics.completions += 1;
      const totalScore = (analytics.responses.reduce((sum, response) => sum + response.score, 0) + score) / (analytics.completions + 1);
      analytics.averageScore = totalScore;
      analytics.responses.push({ userId, score, answers });
      await analytics.save();
    } else {
      // Create new analytics
      analytics = new Analytics({
        quizId,
        completions: 1,
        averageScore: score,
        responses: [{ userId, score, answers }],
      });
      await analytics.save();
    }
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating analytics:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
