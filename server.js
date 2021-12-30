const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());

// Bring in Routes
app.use('/api/users', require('./server/routes/users'));
app.use('/api/auth', require('./server/routes/auth'));
app.use('/api/bugs', require('./server/routes/bugs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
