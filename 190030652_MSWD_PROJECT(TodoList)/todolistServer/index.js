import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import taskRoutes from './routes/tasks.js'

import loginRouter from './controllers/login.js'
import  uRouter from './controllers/user.js'
const app=express();
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(cors())
app.use('/tasks',taskRoutes)
app.use('/api/users', uRouter)
app.use('/api/login', loginRouter)

const CONNECTION_URL='mongodb+srv://lohith:lohith2002@cluster0.pc0qg.mongodb.net/todolist-app?retryWrites=true&w=majority'
const PORT=process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port:${PORT}`)))
.catch((error)=>console.log(error.message))

