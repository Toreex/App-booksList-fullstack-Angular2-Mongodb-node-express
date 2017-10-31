import * as mongoose from 'mongoose';

const collection = 'books'

var BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
}, { collection })

const Book = mongoose.model('Book', BookSchema)

export default Book;