const router = require('express').Router()
const {User} = require('../db/models')
const {adminsOnly, isLoggedIn} = require('../utils/apiMiddleware')
module.exports = router

router.get('/', adminsOnly, async (req, res, next) => {
  try {
    const users = await User.findAll({
      order: ['id'],
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/profile', isLoggedIn, async (req, res, next) => {
  const {userInfo} = req.body
  const sendUserData = {
    name: userInfo.name,
    email: userInfo.email,
    address: userInfo.address,
    zip: userInfo.zip,
    city: userInfo.city,
    state: userInfo.state
  }
  try {
    const updatedUser = await User.update(
      {...sendUserData},
      {
        returning: true,
        where: {id: req.user.id}
      }
    )

    res.json(updatedUser[1])
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', adminsOnly, async (req, res, next) => {
  const {isAdmin} = req.body
  try {
    const updatedUser = await User.update(
      {isAdmin},
      {
        returning: true,
        where: {id: req.params.userId}
      }
    )
    res.json(updatedUser[1])
  } catch (err) {
    next(err)
  }
})
