import {useDispatch} from 'react-redux'
import { createUser,LoginUser } from '../actions/tasks';
import {useState,useEffect} from 'react'
import {getTasks} from '../actions/tasks'


const Signup=({user,setUser,setMessage})=>
{
    
    const dispatch=useDispatch()
    const [cuser,setcuser]=useState({
        username:'',name:'',email:'',password:''
    })
    const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const[login,setLogin]=useState(true)
  const [signup,setSignup]=useState(false)

  const showLogin=()=>
  {
        setLogin(true)
        setSignup(false)
  }
  const showSignup=()=>
  {
      setSignup(true)
      setLogin(false)
  }

const handleUser=(e) =>
{
    e.preventDefault();
    dispatch(createUser(cuser));   
}

const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in with', username,password)
    
    dispatch(LoginUser(username,password));
  
  }
    return(
        <div>
         
            <center>
            <h1 class="display-3">TO-DO LIST APP</h1>
            <br></br><br></br>

            <div className="card w-50">
  <div className="card-body">
    { signup===true ?<form onSubmit={handleUser}>
    <h5 className="card-title">SIGNUP </h5>
                <label class="col-sm-2 col-form-label">Username</label><input type="text" value={cuser.username} onChange={(e)=>setcuser({...cuser,username:e.target.value})} required/><br></br>
                <label  class="col-sm-2 col-form-label">Name</label><input type="text" value={cuser.name}     onChange={(e)=>setcuser({...cuser,name:e.target.value})}   required /><br></br>
                <label  class="col-sm-2 col-form-label">Email</label><input type="text" value={cuser.email}   onChange={(e)=>setcuser({...cuser,email:e.target.value})}   required /><br></br>
                <label  class="col-sm-2 col-form-label">Password</label><input type="password" value={cuser.password} onChange={(e)=>setcuser({...cuser,password:e.target.value})} required/><br></br><br></br>
            <button type="submit"  class="btn btn-outline-secondary" id="button-addon1">create user</button><br></br><br></br>
            <label  class="col-sm-2 col-form-label">Already have an account</label><br></br><button onClick={showLogin} class="btn btn-outline-secondary" type="button" id="button-addon1">Login here</button>
            </form>:<></>}

            {login ===true ?
            <form onSubmit={handleLogin}>
    <h5 className="card-title">Login</h5>
                <label  class="col-sm-2 col-form-label">Username</label><input type="text" value={username} onChange={({ target }) => setUsername(target.value)} required/><br></br>
                <label  class="col-sm-2 col-form-label">Password</label><input type="password" value={password} onChange={({ target }) => setPassword(target.value)}required /><br></br><br></br>
                <button type="submit" class="btn btn-outline-secondary" id="button-addon1">Login</button><br></br><br></br>
                <label  class="col-sm-2 col-form-label">Don't have a account:</label><br></br>
                <button onClick={showSignup} class="btn btn-outline-secondary" type="button" id="button-addon1">Sign Up here</button>
            </form>:<></>}
  </div>
</div>
</center>

</div>


    )


}

export default Signup