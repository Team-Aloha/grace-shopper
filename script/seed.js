'use strict'

const db = require('../server/db')
const {User, Product, Category, Cart, Order, Review} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true, name: 'Cody'}),
    User.create({email: 'murphy@email.com', password: '123', name: 'Murphy'})
  ])

  console.log(`seeded ${users.length} users`)

  const reviews = await Promise.all([
    Review.create({stars: 2, text: 'This is okay I guess'}),
    Review.create({stars: 3, text: 'pretty good but could be better'})
  ])

  const products = await Promise.all([
    Product.create({
      title: 'Kitty Kat Taco V1',
      description: 'This is version 1 of our Kitty Kat Taco Tiki Shirt',
      price: 1000,
      quantity: 20,
      categories: [2, 1]
    }),
    Product.create({
      title: 'Kitty Kat Taco V1',
      description: 'This looks the same as version 1 but it is deffinatly different',
      price: 2000,
      quantity: 10,
      categories: [2, 4]
    }),
    Product.create({
      title: 'Kitty Kat Taco V2',
      description: 'You may be wondering is this the same but it is deffinatly different',
      price: 1500,
      quantity: 15,
      categories: [2, 3]
    }),
    Product.create({
      title: 'Midnight Magic',
      description: 'A perfect shirt for an exotic night on the town',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt1.jpg'
    }),
    Product.create({
      title: 'Classic Tiki',
      description: 'A classic design for the classic person',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt2.jpg'
    }),
    Product.create({
      title: 'Brown Reserve',
      description: 'Straight out of your Grandpas closset. This one is sure to turn heads at cocktail hour',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt3.jpg'
    }),
    Product.create({
      title: 'Red Macaroni',
      description: 'This one looks like it has macaroni on it',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt4.jpg'
    }),
    Product.create({
      title: 'Game Show Host',
      description: 'If you want to look like Pat Sejak, this one os for you',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt25.jpg'
    }),
    Product.create({
      title: 'Bikini Bottom Print',
      description: 'We were inspired by Spongebobs wallpaper to make this design',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt6.jpg'
    }),
    Product.create({
      title: 'Ocean Breeze',
      description: 'An okay shirt',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt7.jpg'
    }),
    Product.create({
      title: 'Purple Rain',
      description: 'Do you like Mai Tais? because this shirt says you do',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt8.jpg'
    }),
    Product.create({
      title: 'Orchid Delight',
      description: 'I thought this was Hawaii not Minniesota',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt9.jpg'
    }),
    Product.create({
      title: 'Groovy Vibes',
      description: 'Do you frost your tips? then this is your shirt',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt10.jpg'
    }),
    Product.create({
      title: 'Sandy Delight',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt11.jpg'
    }),
    Product.create({
      title: '80s Miami',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt12.jpg'
    }),
    Product.create({
      title: 'Beach Diamond',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt13.jpg'
    }),
    Product.create({
      title: 'Draped Velvet',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt14.jpg'
    }),
    Product.create({
      title: 'Tucan Sam',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt15.jpg'
    }),
    Product.create({
      title: 'Old Vintage',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt16.jpg'
    }),
    Product.create({
      title: 'Pineapple Pizaz',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt17.jpg'
    }),
    Product.create({
      title: 'Synth Wave',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt18.jpg'
    }),
    Product.create({
      title: 'Classic Red',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt19.jpg'
    }),
    Product.create({
      title: 'Vapor Wave',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt20.jpg'
    }),
    Product.create({
      title: 'Fractal Tiki',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt21.jpg'
    }),
    Product.create({
      title: 'Beach Diamond',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt22.jpg'
    }),
    Product.create({
      title: 'Coconut Green',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt23.jpg'
    }),
    Product.create({
      title: 'Mild Flowers',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt24.jpg'
    }),
    Product.create({
      title: 'Game Show Host',
      description: 'Insert Desc',
      price: 1500,
      quantity: 15,
      categories: [2],
      imageUrl: 'shirt25.jpg'
    }),
    Product.create({
      title: 'X-Ray Black',
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
    products: [{id: 1, quantity: 2, price: 1000}],
    userId: 1
  })
  const orders = await Promise.all([
    Order.create({
      status: 'processing',
      products: [
        {
          id: 1,
          quantity: 2,
          price: 1000
        },
        {
          id: 2,
          quantity: 1,
          price: 500
        },
        {
          id: 4,
          quantity: 4,
          price: 5000
        }
      ],
      userId: 2
    })
  ])

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
