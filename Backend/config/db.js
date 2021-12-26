const mongoose = require("mongoose");
const user = require('../models/usersModel.js');
const bug = require('../models/bugsModel.js');

const connectDB = async () => {
    try {
        const con = await mongoose.connect(`mongodb+srv://jmchiang:darklord5@mthree-mongo.ojzwn.mongodb.net/movies?retryWrites=true&w=majority`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
        // useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;

