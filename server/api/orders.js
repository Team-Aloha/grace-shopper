const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/', async (req, res, next) => {
  console.log(req.user.id)
  try {

    const orders = await Order.findOne({
      where: {userId: req.user.id}
    })
    res.json(orders)

  } catch (err) {
    next(err)
  }

})


module.exports = router
