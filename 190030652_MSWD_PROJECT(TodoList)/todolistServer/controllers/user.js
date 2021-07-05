import bcrypt from 'bcrypt'
import usersRouter  from 'express'
let uRouter=usersRouter.Router()
import User from '../models/user.js'

uRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    email:body.email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

uRouter.get('/', async (request, response) => {
  try{
    const users = await User.find({}).populate('tasks',{title:1,type:1})
    response.json(users)
  }
  catch(error){
    response.status(404).json({message:error.message})
  }
  })


export default uRouter