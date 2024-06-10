const mongoose = require('mongoose')

require('dotenv').config()
const uri = process.env.MONGO_URI;
mongoose.set('strictQuery', false)
mongoose.connect(uri)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
    date: Date,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)