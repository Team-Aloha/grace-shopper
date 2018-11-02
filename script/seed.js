'use strict'

const db = require('../server/db')
const {User, Product, Category, Cart, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  console.log(`seeded ${users.length} users`)

  const products = await Promise.all([
    Product.create({
      title: 'Blue Shirt',
      description: 'This is a blue shirt',
      price: 1000,
      quantity: 20,
      categories: [2, 1]
    }),
    Product.create({
      title: 'Red Shirt',
      description: 'This is a red shirt',
      price: 2000,
      quantity: 10,
      categories: [2, 4]
    }),
    Product.create({
      title: 'Green Shirt',
      description: 'This is a green shirt',
      price: 1500,
      quantity: 15,
      categories: [2, 3]
    }),
    Product.create({
      title: 'Black Floral',
      description: 'Insert Description',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt1.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt2.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt3.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt4.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt25.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt6.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt7.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt8.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt9.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt10.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt11.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt12.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt13.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt14.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt15.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt16.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt17.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt18.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt19.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt20.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt21.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt22.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt23.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt24.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt25.jpg'
    }),
    Product.create({
      title: 'Shirt',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt26.jpg'
    })
  ])

  await Category.create({
    name: 'Blue'
  })

  await Category.create({
    name: 'Shirt'
  })

  await Category.create({
    name: 'Green'
  })

  await Category.create({
    name: 'Red'
  })
  await Category.create({
    name: 'Accessories'
  })

  await Cart.create({
    products: [{id: 2, quantity: 2}],
    userId: 1
  })

  await Order.create({
    status: 'shipped',
    products: [{id: 1, quantity: 2, price: 1000}]
  })

  console.log(`seeded ${products.length} products`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
