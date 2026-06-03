import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Signup from './pages/UserSignup'
import { useContext } from 'react'
import { UserDataContext } from './context/userContext'



const App = () => {

  const ans = useContext(UserDataContext)
  console.log(ans)

  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
             <Route path='/login' element={<Login />} />
             <Route path='/signup' element={<Signup />} />
             <Route path='/captain-login' element={<CaptainLogin />} />
              <Route path='/captain-signup' element={<CaptainSignup />} />
        </Routes>
    </div>
  )
}

export default App