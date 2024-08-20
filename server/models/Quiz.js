const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,   // Only for Q&A Quiz
    timer: Number            // In seconds
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, enum: ['Poll', 'Q&A'], required: true },
    questions: [QuestionSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    impressions: { type: Number, default: 0 },
});

module.exports = mongoose.model('Quiz', QuizSchema);
