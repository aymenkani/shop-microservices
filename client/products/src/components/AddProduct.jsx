import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import FormData from 'form-data'

const form = new FormData()

const EditProduct = () => {
    const [product, setProduct] = useState({})


    const onChangeHandler = (newValue) => {
        setProduct(prev => {
            return { ...prev, ...newValue }
        })
    }

    const onSubmitHandler = () => {
        Object.keys(product).map(key => {
            if(key === "userId") return;
            form.append(key, product[key])
        })

        fetch('http://localhost:3000/api/products', {
            method: 'POST',
            body: form
        }).then(res => console.log(res.status))
    }

  return (
    <div className="w-full col-span-full grid grid-cols-12">
        <div className=" flex flex-col gap-2 md:col-start-4 md:col-end-10 sm:col-start-2 sm:col-end-12 col-span-full p-2">
            <span className="text-xl font-semibold">Add product</span>
            
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">title</span>
                <input 
                    value={"" || product.title}
                    onChange={(e) => onChangeHandler({ title: e.target.value })}
                    type="text" 
                    name="title" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="Product title"
                    />
            </label>
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">description</span>
                <input 
                    value={"" || product.description}
                    onChange={(e) => onChangeHandler({ description: e.target.value })}
                    type="text" 
                    name="description" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="Product description"
                    />
            </label>
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">price</span>
                <input 
                    value={"" || product.price}
                    onChange={(e) => onChangeHandler({ price: e.target.value })}
                    type="number" 
                    name="number" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="Product price"
                    />
            </label>
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">quantity</span>
                <input 
                    value={"" || product.quantity}
                    onChange={(e) => onChangeHandler({ quantity: e.target.value })}
                    type="number" 
                    name="password" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    placeholder="quantity"
                    />
            </label>
            <label className="w-full flex flex-col">
                <span className="p-2 font-semibold">Product image</span>
                <input 
                    onChange={(e) => onChangeHandler({ image: e.target.files[0] }) }
                    type="file" 
                    name="image" 
                    className="w-full sm:text-gray-800 text-gray-700 rounded-md p-1 pt-3 pb-3 sm:bg-gray-50 bg-gray-100 sm:focus:bg-gray-100 sm:hover:bg-gray-100 outline-none"
                    />
                {
                    product.image && (
                        <img src={URL.createObjectURL(product.image)} className="sm:w-20 sm:h-20 w-full m-2 h-auto"  />
                    )
                }
            </label>

            <span onClick={onSubmitHandler} className="p-2 mt-5 text-center font-semibold cursor-pointer shadow-lg sm:shadow-blue-500/50 text-white rounded-md bg-blue-500">
                Submit
            </span>
        
        </div>
    </div>
  )
}

export default EditProduct