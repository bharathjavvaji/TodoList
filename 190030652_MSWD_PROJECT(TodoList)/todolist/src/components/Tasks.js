import React, { useState,useEffect } from 'react'
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux'
import { getTasks,deleteTask } from '../actions/tasks';

const Tasks=({setCurrentId,setForm,user,setad})=>
{
    let [taskso,setTaskso]=useState(useSelector((state)=>state.tasks))
    let tasks=useSelector((state)=>state.tasks)

    
    
        


   
    const [filter,setFilter]=useState(null)    
    const dispatch=useDispatch()
    const updatee=(id,task)=>
    {
        setCurrentId(id);
        setad(true)
        window.scrollTo(0, 0)

    }
    const deletee=(id)=>
    {
        dispatch(deleteTask(id))

   }
    
    
    const filtering=(e)=>
    {
        e.preventDefault()
     if(filter!=="None")
     {
         console.log((filter))
        setTaskso(tasks.filter(tf=>tf.type===filter))
     }
     else{
          setTaskso(tasks)
     }
    }
    return(
        <div>
        
        <br></br>
      
<>
<center><h3>TO-DO List</h3><br></br>
 <form onSubmit={filtering}>
<select  style={{width:"150px"}}value={filter} onChange={(e)=>setFilter(e.target.value)} > <option value="None">None</option> <option value="Home">Home</option> <option value="Work">Work</option><option value="Shopping">Shopping</option><option value="Food">Food</option></select>&emsp;
<button type="submit" class="btn btn-dark">Filter</button>
    </form></center><br></br>
{ filter!==null ?<>
{taskso.map(eachtask=><>
<div class="card" style={{width: "40rem", margin:" 0 auto",borderRadius:"25%"}} >
  <div class="card-body" key={eachtask._id} style={{background:"palegoldenrod"}}>
    <h5 class="card-title"><strong>Title : {eachtask.title.toUpperCase()} </strong></h5>
    <h6 class="card-subtitle mb-2 text-muted">Related to <bold style={{color:"black"}}>{eachtask.type}</bold></h6>
    <p class="card-text">About : <bold style={{color:"black"}}>{eachtask.description}</bold></p>
    <p style={{color:"black"}}>Complete before {eachtask.duedate.replace('T00:00:00.000Z', '')}</p>
    <button onClick={()=>updatee(eachtask._id,eachtask)} class="btn btn-primary"><strong>update</strong></button>&emsp;
            <button onClick={()=> deletee(eachtask._id)} class="btn btn-danger"><strong>Remove</strong></button>
  </div>
</div>
<br></br>

</>
)}</>:<>
{tasks.map(eachtask=><>
<div class="card" style={{width: "40rem", margin:" 0 auto",borderRadius:"25%"}} >
  <div class="card-body" key={eachtask._id} style={{background:"palegoldenrod"}}>
    <h5 class="card-title"><strong>Title : {eachtask.title.toUpperCase()} </strong></h5>
    <h6 class="card-subtitle mb-2 text-muted">Related to <bold style={{color:"black"}}>{eachtask.type}</bold></h6>
    <p class="card-text">About : <bold style={{color:"black"}}>{eachtask.description}</bold></p>
    <p style={{color:"black"}}>Complete before {eachtask.duedate.replace('T00:00:00.000Z', '')}</p>
    <button onClick={()=>updatee(eachtask._id,eachtask)} class="btn btn-primary"><strong>update</strong></button>&emsp;
            <button onClick={()=> deletee(eachtask._id)} class="btn btn-danger"><strong>Remove</strong></button>
  </div>
</div>
<br></br>

</>
)}
</>}

</>

        </div>
    ) 
}
export default Tasks