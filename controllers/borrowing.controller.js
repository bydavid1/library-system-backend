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
          status: borrowing.date_refused ? 'refused' : borrowing.date_confirmed ? 'confirmed' : borrowing.date_returned ? 'returned' : 'pending'
        });
      })
      res.status(200).send(jsonResource);
    })       
    .catch((error) => {
      res.status(400).send(error);
    });
  }


  static confirmBorrowing(req, res) {
    Borrowing.findByPk(req.params.id)
      .then((borrowing) => {
        Borrowing.update({
          date_confirmed: Date.now(),
        }, {
          where: {
            id: borrowing.id
          }
        }).then(_ => {
          res.status(200).send({
            'success': true,
            'message': 'Book borrowing confirmed'
          });
        }).catch(err => res.status(400).send(err));
      })       
      .catch((error) => {
        res.status(400).send(error);
      });
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
}

module.exports = BorrowingController;