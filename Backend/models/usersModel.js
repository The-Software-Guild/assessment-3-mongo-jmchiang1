import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        defualt: false
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User