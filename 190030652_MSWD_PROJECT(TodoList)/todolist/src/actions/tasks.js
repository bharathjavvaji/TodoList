import * as api from '../api'
import Notification from '../components/Notification'
import App from '../App'
import {useState,useEffect} from 'react'

let token = null

 const setToken = newToken => {
  token = `bearer ${newToken}`
}
export default {setToken}


export const getTasks=(user)=>async(dispatch)=>{
    try {
        let {data}=await api.fetchTasks();
        console.log(user.username)
        data=data.filter(k=>k.user[0].username===user.username)
        const action={type:'FETCH_ALL',payload:data}
        dispatch(action);
    } catch (error) {
        console.log(error.message)
    }

}

export const CreateTask=(task)=>async (dispatch)=>
{
    
    try {
        const loggedUserJSON = window.localStorage.getItem('loggedtodoappUser')
    if (loggedUserJSON) {
      const user1 = JSON.parse(loggedUserJSON)
      setToken(user1.token)
      
    }
        const config = {
            headers: { Authorization: token },
          }
          console.log("sdhkhsk",config)
        const {data}=await api.CreateTask(task,config)
        dispatch({type:'CREATE',payload:data})
    } catch (error) {
        console.log(error)
    }

}

export const updateTask=(id,task)=>async(dispatch)=>
{
    try {

        const {data}=await api.updateTask(id,task)

        dispatch({type:'UPDATE',payload:data})

    } catch (error) {
        console.log(error.message)
    }

}

export const deleteTask=(id)=>async(dispatch)=>
{
    try {
         await api.deleteTask(id)
        dispatch({type:'DELETE',payload:id})
    } catch (error) {
        console.log(error)
    }
}



export const createUser=(userdetails)=>async(dispatch)=>
{
    try {
        const {data}=await api.createUser(userdetails)
        dispatch({type:'ADDUSER',payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const LoginUser =(username,password)=>async(dispatch)=>
{
    try{
        
        const usero=await api.LoginUser({username,password})
        window.localStorage.setItem(
            'loggedtodoappUser', JSON.stringify(usero.data)
          ) 
          setToken(usero.data.token)
          window.location.reload(false);

    }
    catch (error) {
        console.log(error)
            alert("Invalid Creditials")
    }
}
