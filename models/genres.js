const mongoose = require('mongoose');
mongoose.Promise = Promise;

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  create_date: {
    type: String,
    default: Date.now
  }
})

const Genre = module.exports = mongoose.model('Genre', genreSchema);

module.exports.getGenres = (limit) => {
  return new Promise((resolve, reject) => {
    Genre.find()
      .limit(limit)
      .then(data => resolve(data))
      .catch(err => reject(err))
  });
}

module.exports.addGenre = (genre) => {
  return new Promise((resolve, reject) => {
    Genre.create(genre)
      .then(res => resolve(res))
      .catch(err => reject(err))
  });
}

module.exports.updateGenre = (id, genre, options) => {
  return new Promise((resolve, reject) => {
    let query = { _id: id }
    let update = {
      name: genre.name
    }
    Genre.findOneAndUpdate(query, update, options)
      .then(res => resolve(res))
      .catch(err => reject(err))
  });
}