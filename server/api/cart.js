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
        attributes: ["id", "order_status", "cart_quantity"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price","quantity"],
            through: { attributes: [] },
            required: true,
          },
        ],
      });
      if (currentCart) {
        res.json(currentCart);
      } else {
        console.log("no cart - get shopping!");
        throw new Error();
      }
    // } else {
    //   const currentCart = window.sessionStorage.getItem("guestCart") 
    //   if (currentCart) {
    //     res.json(currentCart);
    //   } else {
    //     console.log("no cart - get shopping!");
    //     throw new Error();
    //   }
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
      attributes: ["id", "order_status", "cart_quantity"],
      include: [
        {
          model: Book,
          attributes: ["id", "title", "author", "coverimg", "price", "quantity"],
          through: { attributes: [] },
          required: true,
        },
      ],
    });
      if(currentOrder) {
        await currBook.setCarts(currentOrder.id);
        res.json(currBook)
      } else {
        const newOrder = await Cart.create({
          userId: req.user.id
        })
        await currBook.setCarts(newOrder.id);
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
        attributes: ["id", "order_status", "cart_quantity"],
        include: [
          {
            model: Book,
            attributes: ["id", "title", "author", "coverimg", "price", "quantity"],
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

//checkout after book qty reduced
//charge cart status
router.put('/:id', requireToken, async (req, res, next) => {
    try{
      //look for the cart with the books in the db
      const user = await User.findByPk(req.user.id)
      console.log("api user", user)
      if (user) {
        const currentCart = await Cart.findOne({
          where: {
            order_status: "in cart",
          },
          attributes: ["id", "order_status", "checkout_price", "cart_quantity"],
          include: [
            {
              model: Book,
              attributes: ["id", "title", "author", "coverimg", "price", "quantity"],
              through: { attributes: [] },
              required: true,
            },
          ],
        });
      //delete all the books from the stock db, but save the books data in an array in the cart
      console.log("api cart", currentCart)
      if(currentCart) res.json(await currentCart.update(req.body))
      }
}catch (err) {
    console.log('api error')
    next(err)
  }
})

module.exports = router;
