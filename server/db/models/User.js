const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cart = require('./Cart')

const SALT_ROUNDS = 5;

const User = db.define("user", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  //CC, and address may all be confidential information and we may need to store it in some encrypted way.
  //I was thinking maybe the whole address/credit card block can be stored in its own column/json/object called shopping
  //info or something of the like

  // creditCard:{
  //   Sequelize.INTEGER/FLOAT,
  //   validate:{
  //     isCreditCard: true
  //   }
  // },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cityAddress: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: true,
    // validate: {

    // }
  },

  // This needs to be included for the user routes, Maybe it needs to be randomly generated?
  // id: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     isUUID: true
  //   }
  // },
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT);
    if (verifiedToken) {
      const user = await User.findByPk(verifiedToken.id);
      return user;
    }
    const error = Error("bad credentials");
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

const addCart = async(user) => {
  const cart = await Cart.create()
  cart.setUser(user)
}


User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));

User.afterCreate(addCart)
User.afterBulkCreate(users => Promise.all(users.map(addCart)))
