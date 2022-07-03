import React, { useEffect, useState } from 'react'
import Product from '../Product'
import { Routes, Route } from 'react-router-dom'
import EditProduct from '../EditProduct'
import AddProduct from '../AddProduct'
import ShowProduct from '../ShowProduct';
import UserProducts from '../UserProducts'

const Dashboard = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    
    
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

  }, [])
  return (
    <div className="w-full text-gray-700 grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 p-2">
        <Routes>
          <Route path="/me/products/" element={
            <UserProducts />
          } />
          
          <Route path="/me/products/new/" element={
            <AddProduct />
          } />
          
          <Route path="/me/products/edit/:id" element={
            <EditProduct />
          } />

          <Route path="/products/:id" element={
            <div className="w-full col-span-full h-screen grid grid-cols-12 items-center">
              <div className="sm:col-start-4 sm:col-end-10 col-span-full sm:p-0 p-2">
                <ShowProduct />
              </div>
            </div>
          } />
          
          <Route path="*" element={ products.map((product, i) => (
              <Product key={i} product={product} />
          )) } />
        </Routes>
    </div>
  )
}

export default Dashboard