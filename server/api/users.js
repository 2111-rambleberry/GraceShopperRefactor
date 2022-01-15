const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

//the routes are mounted on /users in the index
router.get('/', requireToken, async (req, res, next) => {
  try {
    //if we managed to make it PAST require token, we can guarantee that we have a user!
    //isAdmin lets us check to see if that user is an Admin
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


//Route to get a specific user based off of id
//mounted on /users/:id
// router.get('/:id', async(res, req, next) => {
//   try{
//     const singleUser = await User.findByPk(req.params.id);
//     res.json(singleUser);
//   }catch(err) {
//     next(err)
//   }
// })

//** Post Route exists in the auth folder */
//posts a new user
//Make note to create a user you only need to input a unique username
// router.post('/', async(req, res, next) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.json(newUser);
//   } catch (err) {
//     next (err)
//   }
// })

// router.put('/:id', async(req, res, next) => {
//   try{
//     const user = await User.findByPk(req.params.id);
//     res.json(await user.update(req.body));
//   }catch (err){
//     next(err)
//   }
// })

