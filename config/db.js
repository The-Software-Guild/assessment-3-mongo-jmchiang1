const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {    //connect db to this application 
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log("MongoDB is Connected") //should see this in console if done correctly 
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;