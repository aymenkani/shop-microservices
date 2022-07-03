import React, { useState } from 'react'
import CartList from './CartList'

const Cart = () => {
    const [openList, setOpenList] = useState(false)

  return (
      <>
        {
            openList && (
                <div onClick={() => setOpenList(false)} className="absolute left-0 top-0 h-screen w-screen"></div>
            )
        }
        <div className="w-fit relative">
            <div className="cursor-pointer p-2 rounded-md bg-pink-500" onClick={() => setOpenList(true)}>cart</div>
            {
                openList && (
                    <>
                        <div onClick={(e) => e.stopPropagation() } className="absolute -translate-x-full left-0 w-40 top-10 max-h-96 overflow-y-auto">
                            <CartList />
                        </div>
                    </>
                )
            }
        </div>
      </>
  )
}

export default Cart