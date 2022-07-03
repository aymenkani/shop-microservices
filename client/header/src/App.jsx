import React , { lazy, Suspense, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa'
//import CartApp from 'cart/CartApp'

import "./header-index.scss";

//const CartApp = lazy(() => import('./components/CartApp'))

const App = ({ cart }) => {
  const [isAuth, setIsAuth] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:3000/api/users/current-user')
    .then(res => res.json())
    .then(user => user.id && setIsAuth(true))
    .catch(err => {
      // only in development
      setIsAuth(true)
    })
  }, [])

  return (
    <>


    
    <div className="flex flex-row-reverse gap-1 bg-blue-500 justify-items-end w-full relative p-2">
      
      <input id="menuBtn" type="checkbox" className="hidden invisible bg-red-500" />

      
      <label onClick={() => setOpenSidebar(!openSidebar)} htmlFor="menuBtn" className="relative">
        <span className="h-10 w-10 rounded-full menu-btn "><FaUserCircle fill="white" className="stroke-account cursor-pointer" size="40px"  /></span>
      </label>
      <div onClick={(e) => e.stopPropagation()} className={`absolute ${openSidebar ? 'flex ' : 'hidden ' } pb-36 z-10 right-1 top-14 rounded-md flex-col gap-1 overflow-y-auto sm:h-80 h-96 sm:w-96 w-full bg-gray-200 `}>
        <span onClick={() => navigate('/me/profile')} className="p-2 w-full cursor-pointer hover:bg-blue-100 mb-5">profile</span>
        {
            isAuth ?
            <span onClick={() => navigate('/logout')} className="p-2 cursor-pointer w-full hover:bg-blue-100">logout</span>
            :
            <>
            <span onClick={() => navigate('/signin')} className="p-2 cursor-pointer w-full hover:bg-blue-100">signin</span>
            <span onClick={() => navigate('/signup')} className="p-2 cursor-pointer w-full hover:bg-blue-100">signup</span>
            </>
        }
      </div>

      
    
      <label htmlFor="menuBtn" className="w-fit close-menu-btn cursor-pointer">
        <div className="fixed flex items-center justify-center bottom-5 left-1/2 sm:left-auto  z-20 sm:top-80 sm:bottom-auto sm:right-1/4 -translate-x-1/2 text-xl rounded-full w-16 h-16  p-2 bg-red-400">
          <span>X</span>
        </div>

        <div className="fixed sm:left-auto bottom-5 z-20 left-1/2 sm:bottom-auto sm:right-1/4 sm:top-80 -translate-x-1/2 rounded-full h-16 w-16 ring-4 ring-blue-500 animate-pulse"></div>
      </label>
    </div>
    </>
  );
}

export default App 
// ReactDOM.render(<App />, document.getElementById("app"));
