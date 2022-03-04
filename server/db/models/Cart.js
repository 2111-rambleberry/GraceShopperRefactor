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
  //   cart_contents:{
  //     // figurre out an array within array
  //     type: Sequelize.ARRAY(Sequelize.ARRAY)
  //  },
  //ordering:
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
  // payment_CreditCardCCV: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     isInt: true,
  //     len: [3]
  //   },
  // },
  // payment_CreditCardEXP: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   validate: {
  //     isDate: true
  //   },
  // },
  // sales_tax_at_checkout: Sequelize.INTEGER,
  // shipping_method: Sequelize.STRING,
  // shipping_price: Sequelize.INTEGER,
  billingAddress: Sequelize.STRING,
  shippingAddress: Sequelize.STRING,
});

module.exports = Cart;

//Cart:
//belongsTo User
//hasMany Book
