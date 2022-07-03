import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Product = ({ product }) => {
  const [owner, setOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isInCart, setIsInCart] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3000/api/users/current-user')
    .then(res => res.json())
    .then(user => {
      setIsLoading(false);
      if (user.id === product.userId) setOwner(true)
      const isProductInCart = user.cart?.some(productInCart => productInCart.id === product.id);
      setIsInCart(isProductInCart);
    })
    .catch(err => {
      setIsLoading(false);
      setOwner(false)
    })

    
  }, [])

  return isLoading ? 
    <div className="w-full text-gray-700 relative cursor-pointer h-80 min-h-max bg-white shadow-md hover:drop-shadow-lg shadow-fuchsia-500 flex flex-col gap-3">
       <div className="w-full animate-pulse bg-opacity-25 h-52 bg-gray-500"></div>
       <div className="w-full flex flex-col gap-1">
          <div className="w-full animate-pulse bg-opacity-25 h-5 bg-gray-500"></div>
          <div className="animate-pulse bg-opacity-25 w-20 h-5 bg-gray-500"></div>
          <div className="animate-pulse bg-opacity-25 w-14 h-5 bg-gray-500"></div>
       </div>
    </div>
  : (
    <div onClick={() => navigate('/products/' + product.id)}  className="w-full text-gray-700 relative cursor-pointer h-80 min-h-max bg-white shadow-md hover:drop-shadow-lg shadow-fuchsia-500 flex flex-col gap-2">
        
        
        {
          !product.image ?
            <div className="w-full h-52 bg-orange-500"></div>
          :
          <img className="w-full h-20 " src={product.image} />
        }
        <div className="w-full p-2 flex flex-col gap-1">
          <span className="text-lg font-semibold">{product.title}</span>
          <span className="text-2xl">{product.price}$</span>
          <span className="text-xl">{product.quantity} available</span>
          <span className="">{product.description}</span>
        </div>
        <div onClick={(e) => e.stopPropagation() } className="w-full p-2 flex cursor-default ">
          {
            owner && (
              <div onClick={() => navigate('/products/edit/' + product.id)} className="p-2 cursor-pointer bg-green-500 rounded-md hover:drop-shadow-lg" >Edit</div>
            )
          }
          {
            !owner && (
              isInCart ? 
              (
                <div onClick={() => navigate('/new/order/')} className="p-2 cursor-pointer bg-blue-500 rounded-md hover:drop-shadow-lg" >Order</div>
              )
              : <div onClick={() => setIsInCart(true)} className="p-2 cursor-pointer bg-blue-500 rounded-md hover:drop-shadow-lg" >Add to cart</div>

            )
          }
        </div>
    </div>
  )
}

export default Product