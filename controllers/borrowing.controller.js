const Borrowing = require('../models').Borrowing;

class BorrowingController {
  constructor() {}

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