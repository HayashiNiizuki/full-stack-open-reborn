const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response, next) => {
  const notes = await Note.find({})
  response.json(notes)
})

notesRouter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedNote = await Note.findByIdAndDelete(id)
  if (!deletedNote) {
    return response.status(404).json({
      error: 'note not found'
    })
  } else {
    response.status(204).end()
  }
})


notesRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
    date: new Date(),
  }

  const updatedNote = Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

module.exports = notesRouter