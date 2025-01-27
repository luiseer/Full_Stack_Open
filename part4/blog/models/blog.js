const mongoose = require('mongoose')
require('dotenv').config()
const config = require('../utils/config')
mongoose.set('strictQuery', false)

const url = config.MONGODB_URI

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
      likes: Number,
    });
    
    // Definir toJSON para transformar el objeto al convertirlo en JSON
    blogSchema.set('toJSON', {
      transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(); // Cambia _id a id
        delete returnedObject._id; // Elimina _id
        delete returnedObject.__v; // Elimina __v
      },
    });
        
module.exports = mongoose.model('Blog', blogSchema)