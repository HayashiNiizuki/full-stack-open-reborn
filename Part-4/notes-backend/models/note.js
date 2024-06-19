const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)