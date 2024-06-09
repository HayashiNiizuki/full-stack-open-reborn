const express = require("express")
const morgan = require("morgan")
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

const generateId = () => {
    return Math.floor(Math.random() * 10e20)
}

let contacts = [
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
    },
    {
        "id": 5,
        "name": "Harry Potter",
        "number": "+86-176-7315-3396"
    }
]

app.get('/api/contacts', (request, response) => {
    return response.json(contacts)
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = contacts.find(p => p.id === id)
    if (person != null) {
        return response.status(200).json(person)
    } else {
        return response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    return response.send(
        `<div>Phonebook has info for ${contacts.length} person.</div>
        <div>${new Date()}</div>`
    )
})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter(person => person.id != id)
    return response.status(204).end()
})

app.post('/api/contacts', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({ error: "content missing" })
    } else if (!body.name) {
        return response.status(400).json({ error: "name missing" })
    } else if (!body.number) {
        return response.status(400).json({ error: "number missing" })
    } else if (contacts.find(p => p.name === body.name)) {
        return response.status(400).json({ error: "person exists" })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(person)
    return response.status(200).json(person)
})

app.head('/api/contacts', (request, response) => {
    return response.status(200).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)