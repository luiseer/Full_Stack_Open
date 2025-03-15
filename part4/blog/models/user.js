const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'The username is required'],
        unique: true,
        minlength: [3, 'The username must be at least 3 characters long'],
        match: [/^[a-zA-Z0-9_]+$/, 'The username can only contain letters, numbers, and underscores']
    },
    name: {
        type: String,
        required: [true, 'The name is required.'],
        minlength: [3, 'The name must be at least 3 characters long'],
    },
    passwordHash: {
        type: String,
        required: [true, 'The password hash is required'],
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        return {
            blogs: returnedObject.blogs,
            username: returnedObject.username,
            name: returnedObject.name,
            id: returnedObject._id.toString(),
        }
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
