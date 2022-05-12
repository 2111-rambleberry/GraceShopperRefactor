const router = require("express").Router();
const { requireToken } = require("./gatekeepingMiddleware");
const {
  models: { Cart, User, Book },
} = require("../db");


router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      const currentCart = await Cart.findOne({
        where: {
          userId: user.id,
          order_status: "in cart",
        },
        attributes: ["id"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price"],
            through: { attributes: [] },
          },
        ],
      });
      if (currentCart) {
        res.json(currentCart);
      } else {
        console.log("no cart - get shopping!");
        throw new Error();
      }
    } else {
      const currentCart = window.sessionStorage.getItem("guestCart") 
      if (currentCart) {
        res.json(currentCart);
      } else {
        console.log("no cart - get shopping!");
        throw new Error();
      }
    }
  } catch (err) {
    console.log(">>>>>>>You are not Authorized!");
    next(err);
  }
});

// add item to cart:
router.post('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id) 
    const currBook = await Book.findByPk(req.body.id);
    if (user) {
      const currentOrder = await Cart.findOne({
      where: {
        userId: user.id,
        order_status: "in cart",
      },
      attributes: ["id"],
      include: [
        {
          model: Book,
          attributes: ["id", "title", "author", "coverimg", "price"],
          through: { attributes: [] },
        },
      ],
    });
      if(currentOrder) {
        await currentOrder.addBook(currBook.id)
        res.json(currBook)
      } else {
        const newOrder = await Cart.create()
        await user.setCarts(newOrder.id) 
        await newOrder.addBook(currBook.id)
        res.json(currBook)
      }
    }
  } catch (error) {
    next(error)
  }
})

// remove item from cart
router.delete('/:bookId', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      const currentOrder = await Cart.findOne({
        where: {
          userId: user.id,
          order_status: "in cart",
        },
        attributes: ["id"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price"],
            through: { attributes: [] },
            required: true,
          },
        ],
      });
      const currBook = await Book.findByPk(req.params.bookId);
      if(currentOrder){
        await currentOrder.removeBook(currBook);
        res.json(currBook);
      } else {
        console.log("not working!")
      }
    }
  } catch (err) {
    next(err)
  }
})

//checkout cart
router.put('/', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      //look for the cart with the books in the db
      const currentOrder = await Cart.findOne({
        where: {
          userId: user.id,
          order_status: "in cart",
        },
        attributes: ["id", "order_status", "checkout_price"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price"],
            through: { attributes: [] },
            required: true,
          },
        ],
      });
      //switch the cart to ordered
      console.log("currentOrder", currentOrder)
      if(currentOrder){
        const order = await currentOrder.update({
          order_status: "ordered"
        });
        //Later on the user profile make ordered items viewable
        await user.setCarts(order)
        console.log(order)
        res.json(order);
        console.log("req.body", req.body)
      } else {
        console.log("not working!")
      }
    }
  } catch (err) {
    next(err)
  }
})

//get orders
router.get("/my-orders", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      const orders = await Cart.findAll({
        where: {
          userId: user.id,
          order_status: "ordered",
        },
        attributes: ["id"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price"],
            through: { attributes: [] },
            required: true
          },
        ],
      });
      if (orders) {
        res.json(orders);
      } else {
        console.log("no cart - get shopping!");
        throw new Error();
      }
    } 
  } catch (err) {
    console.log(">>>>>>>You are not Authorized!");
    next(err);
  }
});

module.exports = router;
