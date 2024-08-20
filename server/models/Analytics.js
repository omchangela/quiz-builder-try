const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  completions: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  responses: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number,
      answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
    },
  ],
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
