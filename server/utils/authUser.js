const db = require('../db')
const app = require('../index')
const User = db.model('user')
const request = require('supertest')

const createAuthUser = async () => {
  //create a user that is in the DB that is an admin
  await User.create({
    email: 'jon@jon.com',
    password: 'test',
    isAdmin: true
  })

  //crete user and connect to our express app
  const authUser = request.agent(app)

  //log the user in
  await authUser
    .post('/auth/login')
    .send({email: 'jon@jon.com', password: 'test'})

  return authUser
}

module.exports = {
  createAuthUser
}
