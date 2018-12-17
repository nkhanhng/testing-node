const mongoose = require('mongoose');
mongoose.Promise = Promise;

const bookSchema = mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  genre:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  author:{
    type: String,
    required: true
  },
  publisher:{
    type: String,
  },
  pages:{
    type: String,
  },
  image_url:{
    type: String,
  },
  buy_url:{
    type: String,
  },
  create_date:{
    type: String,
    default: Date.now
  }
})

const Book = module.exports = mongoose.model('Book',bookSchema);

module.exports.getBooks = (limit) => {
  return new Promise((resolve, reject) => {
    Book.find().limit(limit)
        .then(data => {
          resolve(data)
        })
        .catch(err=>reject(err))
  });
}

module.exports.getBookById = (id) => {
  return new Promise((resolve, reject) => {
    Book.findById(id)
        .then(data => {
          resolve(data)
        })
        .catch(err => reject(err))
  });
}

module.exports.addBook = (book) => {
  return new Promise((resolve, reject) => {
    Book.create(book)
        .then(data => resolve(data))
        .catch(err => reject(err))
  });
}

module.exports.updateBook = (id,book,options) => {
  return new Promise((resolve, reject) => {
    let query = {_id: id};
    let update = {
      title: book.title,
      genre: book.genre,
      description: book.description,
      author: book.author,
      publisher: book.publisher,
      image_url: book.image_url,
      buy_url: book.buy_url
    }

    Book.findOneAndUpdate(query,update,options)
        .then(data => resolve(data))
        .catch(err => reject(err))
  });
}

module.exports.removeBook = (id) => {
  let query = {_id:id}
  return new Promise((resolve, reject) => {
    Book.remove(query)
        .then(query => resolve(query))
        .catch(err => reject(err))
  });
}