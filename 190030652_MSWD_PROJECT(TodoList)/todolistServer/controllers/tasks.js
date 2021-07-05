import mongoose  from 'mongoose';
import tasksData from '../models/tasksData.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }



export const getTasks=async (req,res)=>
{

    try {
        const alltasks = await tasksData
    .find({}).populate('user', { username: 1, name: 1 })

        res.status(200).json(alltasks)
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

export const createTask=async (req,res)=>
{
    const task=req.body;
    const token = getTokenFrom(req)  
    const decodedToken = jwt.verify(token, 'lohith')
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
    const newTask=new tasksData({...task,user:user._id});
    console.log(newTask)
    try {
        const savedTask =  await newTask.save();
        user.tasks = user.tasks.concat(savedTask._id)
  await user.save()
            console.log(newTask)
        res.status(201).json(newTask)
    } 
    catch (error) {
    
        res.status(409).json({message:error.message});
    }

}

export const updateTask=async(req,res)=>
{
    const {id:_id}=req.params
    const task=req.body
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO TASK WITH THAT ID");
try{
const updatedTask=await tasksData.findByIdAndUpdate(_id,task,{new:true})

    res.json(updatedTask)
}
catch(error)
{
    console.log(error)
}
}

export const deleteTask=async(req,res)=>
{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("NO TASK WITH THAT ID");

    await tasksData.findByIdAndRemove(id);
    res.json({message:'Task sucessfully deleted'})

} 