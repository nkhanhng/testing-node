const express = require('express');
const router = express.Router();
const Book = require('../models/book')

router.get('/',(req,res)=>{
  Book.getBooks(2)
      .then(data => res.json(data))
      .catch(err => res.status(404).json({message: "Can not get books"}))
})

router.get('/:_id',(req,res)=>{
  Book.getBookById(req.params._id)
      .then(book => res.json(book))
      .catch(err => res.status(404).json({message: "Book not found"}))
})

router.post('/',(req,res)=>{
  let book = req.body;
  Book.addBook(book)
      .then(() => res.json({message: "Book added", success: 1}))
      .catch(err => res.json({message: "Can not add book"}))
})

//update book 
router.put('/:_id',(req,res)=>{
  let book = req.body;
  Book.updateBook(req.params._id,book)
      .then(()=> res.json({message: "Book updated", success: 1}))
      .catch(err => res.json({message: "Can not update", success: 0}))
})

//delete book 
router.delete('/:_id',(req,res)=>{
  Book.removeBook(req.params._id)
      .then(() => res.json({message: "Deleted", success: 1}))
      .catch(() => res.status(404).json({message: "Book not found", success: 0}))
})

module.exports = router;