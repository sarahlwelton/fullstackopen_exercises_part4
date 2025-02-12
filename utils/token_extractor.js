const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const getUser = async (decodedToken) => {
  return await User.findById(decodedToken.id)
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    response.status(401).json({ error: 'Invalid token' })
  } else {
    request.user = getUser(decodedToken)
  }
  next()
}

module.exports = { tokenExtractor, userExtractor }