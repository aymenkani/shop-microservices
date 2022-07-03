import React, { useEffect, useState } from 'react'
import Product from './Product'

const UserProducts = () => {
    const [products, setProducts] = useState([])


  useEffect(() => {
    fetch(`http://localhost:3000/api/users/products/`)
      .then(res => res.json())
      .then(products => setProducts(products))
      .catch(() => {
        setProducts([
          {
            id: 'id',
            title: 'prodcut title 1',
            description: 'product 1 description',
            price: 25,
            quantity: 10,
            image: null
          },
          {
            id: 'id',
            title: 'prodcut title 2',
            description: 'product 2 description',
            price: 25,
            quantity: 10,
            image: null
          },
          {
            id: 'id',
            title: 'prodcut title 3',
            description: 'product 3 description',
            price: 25,
            quantity: 10,
            image: null
          },
          {
            id: 'id',
            title: 'prodcut title 4',
            description: 'product 4 description',
            price: 25,
            quantity: 10,
            image: null
          },
          
        ])
    }) 

  }, [])


  return (
     <>
        {
            products.map((product, i) => (
                <Product key={i} product={product} />
            ))
        }
     </>
  )
}

export default UserProducts