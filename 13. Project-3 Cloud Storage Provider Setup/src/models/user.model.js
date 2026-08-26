const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }

})

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel