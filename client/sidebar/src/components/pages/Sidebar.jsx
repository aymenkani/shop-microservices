import React from 'react'
import Categories from '../Categories'

const Sidebar = () => {
  return (
    <div className="w-full flex flex-col gap-5 sm:bg-white bg-gray-50">
      <Categories />
    </div>
  )
}

export default Sidebar