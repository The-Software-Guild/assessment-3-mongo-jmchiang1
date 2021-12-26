import mongoose from 'mongoose';
import user from '../models/usersModel.js'
import bug from '../models/bugsModel.js'

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

export default connectDB

