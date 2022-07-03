import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Product = () => {
  const [owner, setOwner] = useState(false)
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isInCart, setIsInCart] = useState(false)

  const navigate = useNavigate()
  const params = useParams()


  useEffect(() => {
    setIsLoading(true)

    fetch('http://localhost:3000/api/users/current-user')
    .then(res => res.json())
    .then(user => {
      setIsLoading(false);
      if (user.id === product.userId) setOwner(true)
      if(user.cart?.some(item => item.id === product.id)) setIsInCart(true)
    })
    .catch(err => {
      setIsLoading(false);
      setOwner(false)
    })

    if(params.id) {
      fetch('http://localhost:3000/api/products/' + params.id )
      .then(res => res.json())
      .then(product => {
        setIsLoading(false);
        setProduct(product)
      })
      .catch(err => {
        setIsLoading(false);
        setProduct(
          {
            id: 'id',
            title: 'target prodcut title',
            description: 'target product 1 description',
            price: 25,
            quantity: 10,
            image: null
          }
        )
      })
    }
  }, [])

  return isLoading ? 
    <div className="absolute grid grid-cols-1 items-center justify-center justify-items-center content-center bg-gray-100 bg-opacity-25 w-full min-h-full">
      <span>Loading...</span>
    </div>
  : (
    <div className="w-full text-gray-700 relative  h-80 min-h-max bg-white shadow-md hover:drop-shadow-lg shadow-fuchsia-500 flex flex-col gap-2">
        
        
        {
          !product.image ?
            <div className="w-full h-40 bg-orange-500"></div>
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
              <div onClick={() => navigate('/products/edit/' + params.id)} className="p-2 cursor-pointer bg-green-500 rounded-md hover:drop-shadow-lg" >Edit</div>
            )
          }
          {
            !owner && (
              isInCart ? 
              (
                <div onClick={() => navigate('/new/order')} className="p-2 cursor-pointer bg-blue-500 rounded-md hover:drop-shadow-lg" >Buy</div>
              )
              : <div onClick={() => setIsInCart(true)} className="p-2 cursor-pointer bg-blue-500 rounded-md hover:drop-shadow-lg" >Add to cart</div>

            )
          }
        </div>
    </div>
  )
}

export default Product