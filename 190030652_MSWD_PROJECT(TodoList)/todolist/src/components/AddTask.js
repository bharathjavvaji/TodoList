import React from 'react'
import { CreateTask,updateTask } from '../actions/tasks';
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';

const AddTask=({currentId,setCurrentId,form,setForm,setad,settl})=>
{

    const[PostTask,setPostTask]=useState({title:'',description:'',duedate:'',type:''});
    let task=useSelector((state)=>currentId? state.tasks.find((t)=>t._id===currentId):null)
    const dispatch=useDispatch()

    useEffect(()=>
    {
        if(task) { task={title:task.title,description:task.description,duedate:task.duedate,type:task.type}
             setPostTask(task);}
    },[task])

    
    const handleSubmit=(e)=>
    {
        e.preventDefault();
       if(task)
       { setad(true)
        settl(false)
           console.log(currentId,PostTask)
        dispatch(updateTask(currentId,PostTask));
        setCurrentId(null)
        setPostTask(
            {title:'',description:'',duedate:'',type:''}
        )
        setad(false)
        settl(true)
       }
       else{
        dispatch(CreateTask(PostTask));

        setPostTask(
            {title:'',description:'',duedate:'',type:''}
        )

        setForm(false)
       }
    }
    const showform=(srn)=>
    {
        if(srn==='show') setForm(true)
        if(srn==='cancel') setForm(false)
    }
    return(
        <div>
            <br></br><br></br>
 
          <center > 
            <>{ !currentId? <div class="card" style={{width: '40rem'}}>
  <div class="card-body" style={{background:"palegoldenrod"}}>
    <h5 class="card-title">ADD TASK    </h5>               

    <form onSubmit={handleSubmit}>
    <label class="col-sm-2 col-form-label">Title</label><input  type="text" value={PostTask.title} onChange={(e)=>setPostTask({...PostTask,title:e.target.value})} required/><br></br>
    <label class="col-sm-2 col-form-label">Description</label><input type="text"  rows="5"  value={PostTask.description} onChange={(e)=>setPostTask({...PostTask,description:e.target.value})} required /><br></br>
    <label class="col-sm-2 col-form-label">Deadline</label><input type="Date" value={PostTask.duedate} onChange={(e)=>setPostTask({...PostTask,duedate:e.target.value})} required /><br></br>
    <label class="col-sm-2 col-form-label">Type</label><select  value={PostTask.type} onChange={(e)=>setPostTask({...PostTask,type:e.target.value})} > <option value="">None</option> <option value="Home">Home</option> <option value="Work">Work</option><option value="Shopping">Shopping</option><option value="Food">Food</option></select><br></br>
              <br></br>  <button type="submit" class="btn btn-info">Add this Task</button>
              
        
            </form>
  </div>
</div>:

<div class="card" style={{width: '40rem'}}>
  <div class="card-body" style={{background:"palegoldenrod"}}>
    <h5 class="card-title">Update TASK <button class="btn-close" onClick={()=>showform('cancel')}  style={{float: "right"}}></button></h5>  
    <form onSubmit={handleSubmit}>
    <label class="col-sm-2 col-form-label">Title</label><input type="text" value={PostTask.title} onChange={(e)=>setPostTask({...PostTask,title:e.target.value})} /><br></br>
    <label class="col-sm-2 col-form-label">Description</label><input type="text"  rows="5"  value={PostTask.description} onChange={(e)=>setPostTask({...PostTask,description:e.target.value})} /><br></br>
    <label class="col-sm-2 col-form-label">Deadline</label><input type="Date" value={PostTask.duedate} onChange={(e)=>setPostTask({...PostTask,duedate:e.target.value})} /><br></br>
    <label class="col-sm-2 col-form-label">Type</label><select  value={PostTask.type} onChange={(e)=>setPostTask({...PostTask,type:e.target.value})} > <option value="">None</option> <option value="Home">Home</option> <option value="Work">Work</option><option value="Shopping">Shopping</option><option value="Food">Food</option></select><br></br>
                <button type="submit" class="btn btn-info">Update this Task</button><br></br><br></br>
                
              
        
            </form>
  </div>
</div>
            }</>

</center>
        </div>
    )
}

export default AddTask