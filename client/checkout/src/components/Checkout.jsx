import React from 'react'

const Checkout = () => {
  return (
    <div className="w-full sm:p-0 p-1 min-h-screen grid grid-cols-12 items-center justify-center content-center">
        <div className="sm:col-start-4 sm:col-end-10 col-span-full bg-gray-200 rounded-md flex flex-col">
            <div className="h-36 w-full overflow-y-auto flex flex-col p-2 gap-1">
                <span>order</span>
                <span>order</span>
                <span>order</span>
            </div>

            <div className="w-full flex flex-col gap-2 p-2 text-gray-700">
                <div className="flex md:flex-row flex-col gap-1 justify-evenly relative">
                    <label className="flex flex-col gap-1">
                        <span> Cart number </span>
                        <input type="text" placeholder="Cart number" className="p-2 rounded-md shadow-md shadow-blue-400 bg-gray-50 hover:bg-gray-100 outline-none" />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span> CVC </span>
                        <input placeholder="CVC" type="password" className="p-2 rounded-md shadow-md shadow-blue-400 bg-gray-50 hover:bg-gray-100 outline-none" />
                    </label>
                    
                    <label className="flex flex-col gap-1">
                        <span className="h-6"> </span>
                        <span className="p-2 text-center  cursor-pointer bg-blue-500 text-white font-semibold shadow-blue-500 shadow-md rounded-md hover:drop-shadow-lg h-fit ">Pay</span>
                    </label>

                </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout