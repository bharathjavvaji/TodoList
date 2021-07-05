import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import lRouter from 'express'
const loginRouter=lRouter.Router()
import User from '../models/user.js'

loginRouter.post('/', async (request, response) => {
  const body = request.body
    console.log(body)
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  

  const token = jwt.sign(
    userForToken, 
    'lohith',
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

export default loginRouter