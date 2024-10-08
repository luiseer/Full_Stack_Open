const express = require('express')
const app = express()

app.use(express.json())


persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req, res) =>{
    res.json(persons)
})

app.get('/api/info', (req, res) =>{
    // res.send('<p>Phonebook has info for people<p/>')
    const requestTime = new Date()
    res.send(`
        <p>Phone book has info for ${persons.length} people<p/>
        <p>${requestTime}<p/>
        `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find( p => p.id === id)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const person = persons.filter(p => p.id !== id)
    res.json(person).status(204).end()
})

const PORT  = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)   
})