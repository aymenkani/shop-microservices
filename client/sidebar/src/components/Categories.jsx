import React from 'react'
import { NavLink } from 'react-router-dom'

const Categories = () => {

    const categories = [
        'cat/man',
        'cat/boys'
    ]

  return (
    <div className="flex flex-col gap-2 w-full">
        <span className="p-2 text-xl font-semibold text-blue-500 w-full">
            Categories
        </span>
        
        { categories.map(cat => (
            <span className="cursor-pointer rounded-r-md p-2 text-lg hover:drop-shadow-md hover:shadow-blue-300 hover:shadow-md w-full">
                <NavLink to={cat}>
                    {cat.split('/')[1]}
                </NavLink>
                </span>
        )) }
    </div>
  )
}

export default Categories