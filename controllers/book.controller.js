const { Op } = require("sequelize");
const Book = require('../models').Book;
const Borrowing = require('../models').Borrowing;

class BookController {
  constructor() {}

  static createBook(req, res) {
    if (!req.body.title || !req.body.author || !req.body.published_year || !req.body.genre) {
      res.status(400).send({
          message: 'Given data was invalid'
      })
    } else {
      Book.create({
            title: req.body.title,
            author: req.body.author,
            published_year: req.body.published_year,
            genre: req.body.genre
        })
        .then((book) => res.status(201).send({
          message: "Book was created successfully"
        }))
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

  static async requestBook(req, res) {
    try {
      const book = await Book.findOne({
        where: {
          id: req.params.id
        }
      });
  
      if (!book) {
        return res.status(400).send({
          'message': 'Book not found'
        });
      }
  
      if (book.stock < 1) {
        return res.status(400).send({
          'message': 'Book is currently unavailable (stock 0)'
        });
      }
  
      const borrowing = await Borrowing.findOne({
        where: {
          [Op.and]: [
            {book_id: book.id},
            {user_id: req.user.id},
            {
              date_returned: {
                [Op.is]: null
              }
            },
            {
              date_refused: {
                [Op.is]: null
              }
            },
          ],
        }
      });
  
      if (borrowing) {
        return res.status(400).send({
          'message': 'You have pending request available'
        });
      }
  
      const newBorrowing = Borrowing.create({
        book_id: book.id,
        user_id: req.user.id,
        date_borrowed: Date.now()
      });
      console.info(newBorrowing);
      
      return res.status(200).send({
        'success': true,
        'message': 'Book borrowing requested'
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  }

  static async returnBook(req, res) {
    try {
      const borrowing = await Borrowing.findByPk(req.params.borrowing_id);
      if (borrowing) {
        await Borrowing.update({
          date_returned: Date.now()
        }, {
          where: {
            id: borrowing.id
          }
        });

        const book = await Book.findByPk(borrowing.book_id)

        await Book.update({
          stock: book.stock + 1
        },{
          where: {
            id: book.id
          }
        })
  
        return res.status(200).send({
          'success': true,
          'message': 'Book returned'
        });
      } else {
        return res.status(400).send({
          message: 'Request not found'
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

module.exports = BookController;