const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB ok')
    })
    .catch((error) => {
        console.log('error to connecting to MongoDB', error.message)
    })

    const blogSchema = new mongoose.Schema({
        title: String,
        author: String,
        url: String,
        likes: Number
    })

module.exports = mongoose.model('Blog', blogSchema)