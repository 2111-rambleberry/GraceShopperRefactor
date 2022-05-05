const router = require("express").Router();
const {
  models: { Book },
} = require("../db");
module.exports = router;

//get all books
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
});

//route to single book
router.get('/:bookId', async(req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.bookId)
    res.json(book);
  } catch (err) {
    next(err);
  }
})

// //Update book qty
router.put('/:bookId', async(req, res, next) => {
  try{
    const book = await Book.findByPk(req.params.bookId)
    res.send(await book.update(req.body))
  }catch(err){
    next(err)
  }
})


