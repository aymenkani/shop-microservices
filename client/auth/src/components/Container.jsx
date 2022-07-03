import React from 'react'

const Container = ({ children }) => {
  return (
    <div className="w-full sm:text-white text-gray-600  grid grid-cols-10 justify-center min-h-screen justify-items-center items-center">
        { children }
    </div>
  )
}

export default Container