import axios from 'axios'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const config = {
    headers: { Authorization: token },
  }

const url='http://localhost:5000/tasks'

const userurl='http://localhost:5000/api/users'
const baseUrl = '/api/login'

export const createUser=(userdetails)=>axios.post(userurl,userdetails)

export const LoginUser=async user =>await axios.post(baseUrl,user)

export const fetchTasks=()=>axios.get(url)
export const CreateTask=(newtask,config)=>axios.post(url,newtask,config).then(console.log(newtask))
export const updateTask=(id,updatedTask)=>axios.patch(`${url}/${id}`,updatedTask).then(console.log(id,updatedTask))
export const deleteTask=(id)=>axios.delete(`${url}/${id}`)