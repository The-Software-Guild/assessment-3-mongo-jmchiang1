const connectDB = require('./Backend/config/db.js');
const express = require('express');
const dotenv  = require('dotenv');
const userRoutes = require('./Backend/routes/userRoute.js');
const bugRoutes = require('./Backend/routes/bugRoute.js');
const authRoutes = require('./Backend/routes/authRoute.js');

//connect database
connectDB()

//dotenv config
dotenv.config()

const app = express()

//Creating API for user
app.use('/users', userRoutes)
app.use('/bugs', bugRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))