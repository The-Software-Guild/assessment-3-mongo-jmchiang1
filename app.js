const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

const uri = "mongodb+srv://jmchiang:darklord5@mthree-mongo.ojzwn.mongodb.net/movies?retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./server/routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});