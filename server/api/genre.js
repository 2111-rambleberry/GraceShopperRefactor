// const router = require("express").Router();
// const {
//   models: { Book },
// } = require("../db");
// const { Op } = require('@sequelize/core');
// const { Sequelize } = require('Sequelize')
// module.exports = router;

// //This is a helper function that will sort through the book->genre object to see if the particular genre is included in the object
// //genre obj = {'fiction', 'Vampires', 'Historical Fiction', 'Cookbook'}
// // function getGenre(anObj){
// //     //gets passed a genre obj--> the genre obj gets passed as an array

// //     //
// // }

// //mounted on api/genre
// router.get('/:genre', async(req, res, next) => {
//     try{
//         const genre = await Book.findAll({
//             where: {
//                 [Sequelize.Op.and]: [

//                 ]
//             }
//             }
//         });
//         res.json(genre)
//     }catch(e){
//         next(e)
//     }
// })