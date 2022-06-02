module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("book", {
    title: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    publishedYear: {
      type: Sequelize.STRING
    },
    genre: {
      type: Sequelize.STRING
    }
  });

  return Book;
};