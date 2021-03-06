const User = require('./user')
const Product = require('./product')
const Category = require('./categories')
const Cart = require('./Cart')
const Order = require('./order')
const Review = require('./review')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasOne(Cart)
User.hasMany(Order)
Order.belongsTo(User)
Review.belongsTo(User)
Review.belongsTo(Product)
Product.hasMany(Review)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Cart,
  Order,
  Review
}
