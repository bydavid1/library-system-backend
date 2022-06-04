const { Op } = require("sequelize");
const Book = require('../models').Book;
const Borrowing = require('../models').Borrowing;

class BookController {
  constructor() {}

  static createBook(req, res) {
    if (!req.body.title || !req.body.author || !req.body.published_year || !req.body.genre) {
      res.status(400).send({
          msg: 'Given data was invalid'
      })
    } else {
      Book.create({
            title: req.body.title,
            author: req.body.author,
            published_year: req.body.published_year,
            genre: req.body.genre
        })
        .then((book) => res.status(201).send(book))
        .catch((error) => {
            console.log(error);
            res.status(400).send(error);
        });
    }
  }

  static getAllBooks(req, res) {
    Book.findAll()
    .then((books) => res.status(200).send(books))
    .catch((error) => {
        res.status(400).send({
            success: false,
            msg: error
        });
    });
  }

  static searchBooks(req, res) {
    Book.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${req.body.query}%`
            }
          },
          {
            author: {
              [Op.like]: `%${req.body.query}%`
            }
          },
          {
            genre: {
              [Op.like]: `%${req.body.query}%`
            }
          }
        ]
      }
    })
    .then((books) => res.status(200).send(books))
    .catch((error) => {
        res.status(400).send({
            success: false,
            msg: error
        });
    });
  }

  static requestBook(req, res) {
    Book.findOne({
      where: {
        id: req.params.id
      }
    }).then((book) => {
      Borrowing.create({
        book_id: book.id,
        user_id: req.user.id,
        date_borrowed: Date.now()
      })
    })
    .then((borrowing) => {
      res.status(200).send({
        'success': true,
        'message': 'Book borrowing requested'
      });
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
  }

  static returntBook(req, res) {
    Borrowing.findOne({
      where: {
        id: req.params.borrowing_id
      }
    }).then((borrowing) => {
      Borrowing.update({
        date_returned: Date.now()
      }, {
        where: {
          id: borrowing.id
        }
      })
    })
    .then((borrowing) => {
      res.status(200).send({
        'success': true,
        'message': 'Book returned'
      });
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
  }
}

module.exports = BookController;