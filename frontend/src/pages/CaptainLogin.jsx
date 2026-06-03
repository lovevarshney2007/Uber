import {Link} from "react-router-dom"
import { useState } from "react"

const CaptainLogin = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [captainData,setCaptainData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setCaptainData({
      email:email,
      password:password
    })
    console.log(captainData)
    setEmail("")
    setPassword("")
  } 

  return (
    <div className="p-7 min-h-screen flex flex-col justify-between">
      <div>
        <img className="w-20 mb-8 " src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

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
         Join a fleet ? <Link to="/captain-signup" className="text-blue-500 hover:underline mb-3">Register as a Captain</Link>
        </p>

      </div>
      
      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin