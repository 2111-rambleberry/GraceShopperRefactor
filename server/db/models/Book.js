const Sequelize = require("sequelize");
const db = require("../db");

const Book = db.define("book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  series: {
    type: Sequelize.STRING,
  },
  author: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  language: {
    type: Sequelize.STRING,
  },
  isbn: {
    type: Sequelize.STRING,
    //allowNull: false,
    validate: {
      len: [10, 13],
    },
  },
  genres: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  bookformat: {
    type: Sequelize.STRING,
  },
  pages: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
    },
  },
  publisher: {
    type: Sequelize.STRING,
  },
  coverimg: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg'
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 500,
  },
  bought: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
});

//could possibly create a class method that returns all books that have a particular genre
// Book.getGenreBooks = function(genre){
//  return Book.findAll({
  //where: {
    //
  //}
//})
// }

//class method that returns true/false if a book has a particular genre
Book.prototype.hasGenre = function(genre){
  return this.genres.includes(genre);
}

module.exports = Book;
