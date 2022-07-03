import React from 'react'
import Container from '../Container'

const Signin = () => {
  return (
        <div className="sm:col-start-4 sm:col-end-8 col-span-full p-2 sm:bg-blue-400 sm:shadow-lg sm:shadow-blue-500 rounded-lg h-96 w-full flex flex-col gap-5 items-center">
            <span 
                className="text-2xl font-semibold sm:text-white text-blue-500 sm:pb-10 pb-8"
                >
                Online Shop
            </span>

            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">Email</span>
                <input 
                    type="email" 
                    name="email" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="Your Email"
                    />
            </label>
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">Password</span>
                <input 
                    type="password" 
                    name="password" 
                    className="w-full text-gray-800 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="Your Password"
                   />
            </label>

            <span className="p-2 font-semibold cursor-pointer shadow-lg sm:shadow-blue-500/50 text-white rounded-md bg-blue-500">
                Signin
            </span>
        </div>
  )
}

export default Signin