import React, { useState,useEffect } from 'react'
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'
import Signup from './components/Signup'
import {useDispatch} from 'react-redux'
import {getTasks} from './actions/tasks'
import tasks from './actions/tasks'
import {useSelector} from 'react-redux';
import Notification from './components/Notification'

const App=()=> {
const[currentId,setCurrentId]=useState(null)
let [user,setUser]=useState(null)
const [form,setForm]=useState(false)
const [tl,settl]=useState(false)
const [ad,setad]=useState(false)
const [message,setMessage]=useState(null)

  const dispatch=useDispatch();
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedtodoappUser')
      if (loggedUserJSON) {
       user= JSON.parse(loggedUserJSON)
       setUser(user)
      console.log("sssssssss",user)
    }

  }, [])

  useEffect(()=>
  {
dispatch(getTasks(user));
setMessage(message);
  },[dispatch]);
  const logoutuser =()=>
  {
    window.localStorage.clear()
      console.log("logoutted")
      user=null
      window.location.reload(true);

  }
  if(user===null)
  {
    return (<Signup user={user} setUser={setUser}/>)
  }


const taskslist=()=>
{
  settl(true)
  setad(false)
}
const taskform=()=>
{
  settl(false)
  setad(true)
}



  return (
    <div >
      { (user===null) ?<Signup user={user} setUser={setUser} setMessage={setMessage}/>:
      <>          

<nav class="nav flex-column" style={{background:"turquoise",height:"250px"}}><br></br>
<p class="h5" style={{textIndent:"1300px"}}>Welcome back <strong>{user.name}</strong> </p>
<h3 class="display-6" style={{textIndent:"80px"}}><strong>TO-DO LIST APP</strong>       <button onClick={logoutuser} style={{float: "right",marginRight:'100px'}} class="btn btn-warning">Logout</button>
 </h3>
<h4 style={{textIndent:"110px"}}>Be on your schedule</h4>
<p><button style={{float: "right",marginRight:'100px',background:"turquoise"}} class="btn btn-info" onClick={taskslist}>TO-DO List</button>
<button style={{float: "right",marginRight:'100px',background:"turquoise"}} class="btn btn-info" onClick={taskform}>Create TO-DO</button></p>

</nav>

     {ad ? <AddTask currentId={currentId} setCurrentId={setCurrentId} form={form} setForm={setForm} setad={setad} settl={settl}/>:<></>}
     {tl ? <Tasks setCurrentId={setCurrentId} setForm={setForm} user={user} setad={setad} />:<></>}
    
      </>}
      
    </div>
  );

}
export default App;
