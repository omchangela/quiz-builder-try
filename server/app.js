const express = require('express');
const auth = require('./middleware/auth');
const User = require('./models/User');
const cors = require('cors');
const app = express();
const connectDB = require('./configs/db');

require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Protected Route Example
app.get('/api/dashboard', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
app.use('/api/users', require('./routes/auth'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
