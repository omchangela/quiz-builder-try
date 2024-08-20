const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./auth'));
router.use('/api/dashboard', require('./dashboard'));
router.use('/api/quizzes', require('./quizRoutes'));

module.exports = router;
