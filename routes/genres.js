const express = require('express');
const router = express.Router();
const Genres = require('../models/genres');

router.get('/', (req, res) => {
  Genres.getGenres(5)
    .then(data => res.json(data))
    .catch(err => res.json({ message: "Can not get all books" }))

})

router.post('/', (req, res) => {
  let genre = req.body
  Genres.addGenre(genre)
    .then(() => res.json({ message: "succesfully" }))
    .catch((err) => res.status(400).json({ message: "Failed" }))

})

module.exports = router;