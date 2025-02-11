const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (username.length < 3 || password.length < 3) {
    response.status(400).send({ error: 'Usernames and passwords must be at least 3 characters.' }).end()
  } else {
    const user = new User ({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }

})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter