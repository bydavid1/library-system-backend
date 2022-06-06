const Borrowing = require('../models').Borrowing;
const User = require('../models').User;
const Book = require('../models').Book;

class BorrowingController {
  constructor() {}

  static getAllBorrowings(req, res) {
    Borrowing.findAll({
      include: [User, Book]
    })
    .then((borrowings) => {
      let jsonResource = [];
      borrowings.forEach(borrowing => {
        jsonResource.push( {
          id: borrowing.id,
          createdAt: borrowing.createdAt,
          user_name: borrowing.User?.first_name,
          book_name: borrowing.Book?.title,
          book_author: borrowing.Book?.author,
          status: borrowing.date_refused ? 'refused' : borrowing.date_returned ? 'returned' : borrowing.date_confirmed ? 'confirmed' : 'pending'
        });
      });
      res.status(200).send(jsonResource);
    })       
    .catch((error) => {
      res.status(400).send(error);
    });
  }


  static async confirmBorrowing(req, res) {
    try {
      const borrowing = await Borrowing.findByPk(req.params.id);
      if (borrowing) {
        await Borrowing.update({
          date_confirmed: Date.now(),
        }, {
          where: {
            id: borrowing.id
          }
        });

        const book = await Book.findByPk(borrowing.book_id)
  
        await Book.update({
          stock: book.stock - 1
        },{
          where: {
            id: book.id
          }
        })
  
        return res.status(200).send({
          'success': true,
          'message': 'Book borrowing confirmed'
        });
      } else {
        return res.status(404).send({
          message: 'Request not found'
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static refuseBorrowing(req, res) {
    Borrowing.findByPk(req.params.id)
    .then((borrowing) => {
      Borrowing.update({
        date_refused: Date.now(),
      }, {
        where: {
          id: borrowing.id
        }
      }).then(_ => {
        res.status(200).send({
          'success': true,
          'message': 'Book borrowing refused'
        });
      }).catch(err => res.status(400).send(err));
    })       
    .catch((error) => {
      res.status(400).send(error);
    });
  }

  static getBorrowingsByUser(req, res) {
    Borrowing.findAll({
      where: {
        user_id: req.user.id
      },
      include: Book
    })
    .then((borrowings) => {
      let jsonResource = [];
      borrowings.forEach(borrowing => {
        jsonResource.push( {
          id: borrowing.id,
          createdAt: borrowing.createdAt,
          book_name: borrowing.Book?.title,
          status: borrowing.date_refused ? 'refused' : borrowing.date_returned ? 'returned' : borrowing.date_confirmed ? 'confirmed' : 'pending'
        });
      });
      res.status(200).send(jsonResource);
    })       
    .catch((error) => {
      res.status(400).send(error);
    });
  }
}

module.exports = BorrowingController;