import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({

    title:{type:String},
    description:String,
    duedate:Date,
    type:String,
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
});


const tasksData =mongoose.model('TaskData',taskSchema)

export default tasksData