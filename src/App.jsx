import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import './App.css'
import Profile from './components/Profile';
import Login from './components/Login';
import {useDispatch, useSelector} from "react-redux"
import { selectUser } from './redux/userSlice';
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from "./firebase";
import {login,logout} from './redux/userSlice'

const App = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch()
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(userAuth)=>{
      if(userAuth){
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }))
      }
      else{
        dispatch(logout())
      }
    })
    return unsubscribe
  },[])


  return (
    <div className='bg-black no-scrollbar'>
      <Router>
        {!user ?
          <Login />
          :
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={Profile} />
          </Routes>

        }
      </Router>


    </div>
  )
}

export default App