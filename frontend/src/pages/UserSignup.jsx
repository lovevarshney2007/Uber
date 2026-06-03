import {Link} from "react-router-dom"
import { useState } from "react"

const UserLogin = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [userData,setUserData] = useState({})


  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      email:email,
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      password:password
    })
    console.log(userData)
    setEmail("")
    setFirstName("")
    setLastName("")
    setPassword("")
  } 

  return (
    <div className="p-7 min-h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 mb-10 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <form onSubmit ={(e) => submitHandler(e)}>

      <h3>What's your name  </h3>
      <div className="flex gap-3 mb-5">
        <input 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type="text"
         required 
         className="bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-base placeholder:text-base"
         placeholder="First Name.." 
         
         />
         <input 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type="text"
         className="bg-[#eeeeee] w-1/2 rounded px-2 py-2 border text-base placeholder:text-base"
         placeholder="Last Name.." 
         />
      </div>

        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
         required 
         className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
         placeholder="Enter your email.." 
         />

        <h3 className="text-base font-medium mb-2">Enter your password</h3>

        <input 
          className="bg-[#eeeeee] mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
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
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline mb-3">Login here</Link>
        </p>

      </div>
      
      <div>
        <Link
          to='/captain-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-base placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
       <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
  )
}

export default UserLogin