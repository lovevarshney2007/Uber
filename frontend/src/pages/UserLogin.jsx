import {Link,useNavigate} from "react-router-dom"
import { useState,useContext } from "react"
import UserContext from "../context/userContext"
import { UserDataContext } from "../context/userContext"
import axios from "axios"

const UserLogin = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [userData,setUserData] = useState({})

  const {user, setUser } = useContext(UserDataContext)

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const userData = {
      email:email,
      password:password
    }
    console.log(userData)
    setEmail("")
    setPassword("")

     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if(response.status === 200){
    const data = response.data
    setUser(data.user)
    localStorage.setItem('token',data.token)
    navigate("/home")
  }
  } 

 

 

  return (
    <div className="p-7 min-h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <form onSubmit ={(e) => submitHandler(e)}>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
         required 
         className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
         placeholder="Enter your email.." 
         />

        <h3 className="text-lg font-medium mb-2">Enter your password</h3>

        <input 
          className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
        placeholder="Enter your password.." 
        />

        <button
          className="bg-[#111] text-white font-bold mb-7 rounded px-2 py-2 w-full text-lg placeholder:text-base"
        >
          Login
        </button>

      </form>

      <p className="text-center text-[#111] font-medium">
          New Here? <Link to="/signup" className="text-blue-500 hover:underline mb-3">Sign up</Link>
        </p>

      </div>
      
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin