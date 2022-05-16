const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  //cart state:
  cart_quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  order_name: {
    type: Sequelize.STRING,
  },
  order_status: {
    type: Sequelize.ENUM("in cart", "ordered"),
    defaultValue: "in cart",
    validate: {
      notEmpty: true,
    },
  },
  order_date: {
    type: Sequelize.DATE,
  },
  //Check out/payment:
  checkout_price: {
    type: Sequelize.INTEGER,
  },
  payment_CreditCardNum: {
    //just last 4 digits
    type: Sequelize.STRING,
    validate: {
      len: [4],
    },
  },
  billingAddress: Sequelize.STRING,
  shippingAddress: Sequelize.STRING,
});

Cart.prototype.changeStatus = async(status) => {
  this.order_status = status;
}

module.exports = Cart;

//Cart:
//belongsTo User
//hasMany Book
