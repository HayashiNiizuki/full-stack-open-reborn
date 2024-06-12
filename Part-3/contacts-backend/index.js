const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const Contact = require('./models/contact')

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('build'))

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.get('/api/contacts', (request, response) => {
  Contact.find({}).then(contacts => response.json(contacts))
})

app.get('/api/contacts/:id', (request, response, next) => {
  Contact.findById(request.params.id).then(contact => {
    response.json(contact)
  }).catch(error => next(error))
})

app.get('/info', async (request, response) => {
  const count = await Contact.countDocuments({})
  return response.send(
    `<div>Phonebook has info for ${count} person.</div>
        <div>${new Date()}</div>`
  )
})

app.delete('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id

  Contact.findByIdAndDelete(id)
    .then(deletedContact => {
      if (!deletedContact) {
        return response.status(404).json({
          error: 'contact not found'
        });
      }
      response.status(204).end();
    })
    .catch(error => next(error))
})

app.patch('/api/contacts/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: "content missing" })
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" })
  }

  Contact.findByIdAndUpdate(
    id,
    { number: body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedContact => response.json(updatedContact))
    .catch(error => next(error))
})

app.post('/api/contacts', async (request, response, next) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ error: "content missing" })
  } else if (!body.name) {
    return response.status(400).json({ error: "name missing" })
  } else if (!body.number) {
    return response.status(400).json({ error: "number missing" })
  }

  existObj = await Contact.findOne({ name: body.name })
  if (existObj) {
    return response.status(400).json({ error: "person exists" })
  } else {
    const contact = new Contact({
      name: body.name,
      number: body.number
    })

    contact.save()
      .then(savedContact => {
        return response.json(savedContact)
      })
      .catch(error => {
        response.status(500).json({ error: 'an error occurred while saving the cobtact' })
      })
  }
})

app.head('/api/contacts', (request, response) => {
  return response.status(200).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)