'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Borrowing.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Borrowing.belongsTo(models.Book, {
        foreignKey: 'book_id'
      });
    }
  }
  Borrowing.init({
    book_id: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_borrowed: {
      type: DataTypes.DATE,
      allowNull: false
    },
    date_confirmed: {
      type: DataTypes.DATE,
    },
    date_refused: {
      type: DataTypes.DATE,
    },
    date_returned: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Borrowing',
  });
  return Borrowing;
};