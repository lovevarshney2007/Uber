import {Routes, Route} from 'react-router-dom'
import Start from './pages/Start'
import Login from './pages/UserLogin'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Signup from './pages/UserSignup'
import Home from './pages/Home'
import { useContext } from 'react'
import { UserDataContext } from './context/userContext'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'



const App = () => {

  const ans = useContext(UserDataContext)
  console.log(ans)

  return (
    <div>
        <Routes>
            <Route path='/' element={<Start />} />
             <Route path='/login' element={<Login />} />
             <Route path='/signup' element={<Signup />} />
             <Route path='/captain-login' element={<CaptainLogin />} />
              <Route path='/captain-signup' element={<CaptainSignup />} />
              <Route path="/home" element={
                <UserProtectWrapper>
                  <Home />
                  </UserProtectWrapper>

              } />

              <Route path='/user/logout' element={<UserProtectWrapper>
                <UserLogout/>
              </UserProtectWrapper>} />

              <Route path='/captain-home' element={
                <CaptainProtectWrapper>
                  <CaptainHome />
                </CaptainProtectWrapper>
              } />

        </Routes>
    </div>
  )
}

export default App