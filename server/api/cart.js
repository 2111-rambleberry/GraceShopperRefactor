const router = require("express").Router();
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
const {
  models: { Cart, User, Book },
} = require("../db");

// find user cart:
router.get("/", requireToken, async (req, res, next) => {
  try {
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
  } catch (err) {
    console.log(">>>>>>>You are not Authorized!");
    next(err);
  }
});

// add item to cart:
router.post('/', requireToken, async (req, res, next) => {
  try {
    const currBook = await Book.findByPk(req.body.id);
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
      if(currentOrder){
        await currBook.setCarts(currentOrder.id);
        res.json(currentOrder)
      } else {
        const currentOrder = await Cart.create({
          userId: req.user.id
      })
      await currentOrder.save();
      // await currBook.setCarts(currentOrder.id);
      // res.json(currentOrder)
    }
  } catch (error) {
    next(error)
  }
})

// remove item from cart
router.delete('/:bookId', requireToken, async (req, res, next) => {
  try {
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
    } else {
      console.log("not working!")
    }
    await currentOrder.save();
    res.send();
  } catch (err) {
    next(err)
  }
})


module.exports = router;
