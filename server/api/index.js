const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/books", require("./books"));
router.use("/cart", require("./cart"));
router.use("/stock", require("./stock"));
router.use('/genre', require('./genre'));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
