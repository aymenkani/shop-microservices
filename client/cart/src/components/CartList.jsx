import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CartList = () => {
    const [cart, setCart] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:3000/api/users/current-user')
            .then(res => res.json())
            .then(user => {
                setCart(user.cart)
            }).catch(err => {
                setTimeout(() => {
                    setCart([
                        {id: '1', title: "title1", price: '75,99'},
                        {id: '2', title: "title2", price: '199'},
                        {id: '3', title: "title3", price: '99'},
                    ])
                    setIsLoading(false)
                }, 3000);
            })
            
    }, [])

return(
    <div className="flex flex-col gap-2 text-gray-700 w-full bg-pink-100 rounded-md">
        {
            isLoading ? 
                <div className="w-full flex justify-center items-center z-10">
                    <span className="w-7 h-7 z-10 rounded-full animate-spin  border-2 border-t-pink-600 border-b-pink-600"></span>
                </div>
            :
            cart?.map((item, i) => (
                <div onClick={() => navigate(`/products/${item.id}`)} key={i} className="flex flex-row gap-1 p-2 hover:bg-slate-100 cursor-pointer rounded-md">
                    <span className="max-w-xs overflow-x-hidden">{item.title}</span>
                    <span className="max-w-xs overflow-x-hidden">{item.price}$</span>
                </div>
            ))
        }
    </div>
  )
}

export default CartList
