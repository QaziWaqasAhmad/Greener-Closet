import React from 'react'
import noProduct from "../assets/noProduct.png"
const NoProduct = () => {
  return (
    <>
    <div className="no-product text-center d-flex align-items-center justify-content-center flex-column mt-5">
        <img src={noProduct} alt="no product are shown" className='no-product-found text-muted' /> 
         <h4 className='text-muted mt-2'>No Products Found</h4>
    </div>
    </>
  )
}

export default NoProduct