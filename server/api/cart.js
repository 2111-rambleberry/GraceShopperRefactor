const router = require("express").Router();
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
const {
  models: { Cart, User, Book },
} = require("../db");


router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (user) {
      const currentCart = await Cart.findOne({
        where: {
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
        // await currBook.setCarts(currentOrder.id);
        // res.json(currBook)
      } else {
        const newOrder = await Cart.create()
        await user.setCart(newOrder.id) 
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

// remove item from stock db
router.post('/:bookId', requireToken, async (req, res, next) => {
    try{
      //look for the cart with the books in the db
      const currentOrder = await Cart.findOne({
        where: {
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
      //delete all the books from the stock db, but save the books data in an array in the cart

      //switch the cart to ordered

      //Later on the user profile make ordered items viewable
  } catch (err) {
    next(err)
  }
})

module.exports = router;
