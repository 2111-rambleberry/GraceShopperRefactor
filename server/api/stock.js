const router = require("express").Router();
const { models: { Book } } = require("../db");
const { requireToken, isAdmin } = require("./gatekeepingMiddleware");
module.exports = router;

//admin book routes

//get all books
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

//route to single book
router.get('/:stockId', requireToken, isAdmin, async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.stockId)
    res.json(book);
  } catch (err) {
    next(err);
  }
})

//route to edit/update book
router.put('/:stockId', requireToken, isAdmin, async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.stockId)
    console.log(book)
    res.json(await book.update(req.body));
  } catch (err) {
    next(err);
  }
})

// //route to delete book
router.delete('/:bookId', requireToken, isAdmin, async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bookId)
    await book.destroy();
    res.json(book);
  } catch (err) {
    next(err);
  }
})

router.post('/', requireToken, isAdmin, async(req, res, next) => {
  try {
    const book = await Book.create(req.body)
    res.json(book);
  } catch (err) {
    next(err);
  }
})

