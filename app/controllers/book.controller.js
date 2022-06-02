const db = require("../models");
const Book = db.book;

exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // create book
  const book = {
    title: req.body.title,
    author: req.body.description,
    publishedYear: req.body.publishedYear,
    genre: req.body.genre
  };

  // save book
  Book.create(book)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while saving book"
      });
    });
};