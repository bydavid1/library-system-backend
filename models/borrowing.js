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
      // define association here
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
    date_returned: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Borrowing',
  });
  return Borrowing;
};