//this is the access point for all things database related!

const db = require("./db");
const Sequelize = require("sequelize");

const User = require("./models/User");
const Cart = require("./models/Cart");
const Book = require("./models/Book");
//associations could go here!

//explicitly defining the join table allows me to leave out the timestamp columns
const Book_Cart = db.define("Book_Carts", {}, { timestamps: false });
User.hasMany(Cart);
Cart.belongsTo(User);
Book.belongsToMany(Cart, { through: "Book_Carts" });
Cart.belongsToMany(Book, { through: "Book_Carts" });

module.exports = {
  db,
  models: {
    User,
    Cart,
    Book,
  },
};
