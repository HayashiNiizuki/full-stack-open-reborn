const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response, next) => {
  Note.find({}).then(notes => { response.json(notes) })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findByIdAndDelete(id)
    .then(deletedNote => {
      if (!deletedNote) {
        return response.status(404).json({
          error: 'note not found'
        });
      }
      response.status(204).end();
    })
    .catch(error => next(error))
})

notesRouter.post('/', (request, response, next) => {
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

  note.save()
    .then(savedNote => {
      response.json(savedNote);
    })
    .catch(error => next(error));
})

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
    date: new Date(),
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter