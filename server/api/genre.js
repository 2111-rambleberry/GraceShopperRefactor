const router = require("express").Router();
const {
  models: { Book },
} = require("../db");
const { Op } = require('sequelize')
module.exports = router;

// //mounted on api/genre
router.get('/:genre', async(req, res, next) => {
    try{
        const genre = req.params.genre;
        const genreBook = await Book.findAll({
            where: {
                    genres:{
                        [Op.contains]: [`'${genre}'`]
                }
            }
        });
        res.json(genreBook)
    }catch(e){
        next(e)
    }
})