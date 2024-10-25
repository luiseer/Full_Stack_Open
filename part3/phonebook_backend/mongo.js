const mongoose = require('mongoose')
const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.l43f4.mongodb.net/Cluster0?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const contact = new Contact ({
        name: name,
        number: number
    })
    contact.save().then(() => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else if (process.argv.length === 3) {
    Contact.find({}).then((r) => {
        console.log('phonebook')
        r.forEach((contact) => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connect.close()
    })
} else {
    console.log('Usage: node mongo.js <password> [name number]')
    mongoose.connection.close()
}

