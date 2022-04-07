const router = require("express").Router();
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
const {
  models: { Cart, User, Book },
} = require("../db");

// find user cart:
router.get("/", async (req, res, next) => {
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
        order_status: 'in cart',
        userId: req.user.id
      }
    }
    // defaults:{
    //   cartId: currentOrder.id
    // }
    )
      if(currentOrder){
        await currBook.setCarts(currentOrder.id);
        res.json(currentOrder)
      } else {
        const currentOrder = await Cart.create({
          userId: req.user.id
        })
        await currentOrder.save();
        await currBook.setCarts(currentOrder.id);
        res.json(currentOrder)
      }
  } catch (error) {
    next(error)
  }
})

// remove item from cart
router.delete('/:bookId', requireToken, async (req, res, next) => {
  try {
    const currBook = await Book.findByPk(req.params.bookId);
    const currentOrder = await Cart.findOne({
      where: {
        order_status: 'in cart',
        userId: req.user.id
      }
    })
    console.log(currentOrder)
    console.log(currBook)
    // await currentOrder.delete(currBook)
    // await currentOrder.save();
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

// //update cart:
// router.put(':id', async (req, res, next) => {
//     try {
//       const updatingCart = await Cart.findByPk(req.params.id)
//       res.send(await updatingCart.update(req.body))
//     } catch (error) {
//       next(error)
//     }
//   })

module.exports = router;
