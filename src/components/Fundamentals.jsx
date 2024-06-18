import React from 'react'
import RecyclingIcon from '@mui/icons-material/Recycling';
import SpaIcon from '@mui/icons-material/Spa';
import Kawai from "../assets/Kawaii.png"
import Recycling from "../assets/Recycling.png"
import Leaf from "../assets/Leaf.png"


const Fundamentals = () => {
  return (
    <>
      <div className="fundamentals-container d-flex align-items-center justify-content-center text-center margin-top">
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center fundamental-row">
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="recycle text-white">
                            <img src={Recycling} alt="Recycling" />
                            <h4 className='pt-3 pb-2'>Recycle</h4>
                            <p>Artisanal clothes crafted with care for a luxurious experience.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recycle text-white">
                            <img src={Leaf} alt="Leaf" />
                            <h4 className='pt-3 pb-2'>Natural</h4>
                            <p>We only use the finest natural ingredients.</p> 
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="recycle text-white">
                            <img src={Kawai} alt="Kawai" />
                            <h4 className='pt-3 pb-2'>Cruelty Free</h4>
                            <p>Cruelty-free products that prioritize animal welfare.</p> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Fundamentals