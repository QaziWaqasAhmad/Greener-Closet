import React, { useState } from 'react'
import TextFeilds from '../TextFeilds'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import fLogo from "../../assets/footer-logo.png"
import { Link } from 'react-router-dom';
import { subscribe } from '../../services/products/Products';
import { toast,ToastContainer } from 'react-toastify';
const Footer = () => {

  const [email,setEmail]=useState("")

  const handleSubscribe=()=>{
    if(!email.trim()){
      toast.error('Email is Required')
    }else if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
    }else{
    let body={
      email:email,
    }
    subscribe(body).then((res)=>{
      if (res?.status==200) {
        setEmail("")
        toast.success(res?.data?.message)
      }else{
        toast.error(res?.data?.message)
      }

    }).catch((error)=>{
      toast.error("Something went wrong")
    })
  }
  }
  return (
    <>
    <ToastContainer
     position="top-right"
     autoClose={1000}
     hideProgressBar={true}
     newestOnTop
     closeOnClick
     // rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="colored"
   />
   <div className="footer-container d-flex align-items-center justify-content-center text-white">
      <div className="container">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="top-footer-center text-center mt-md-4">
            <h3>Become a part of our community</h3>
            <p>Join Our email list to stay updated and informed.</p>
            <div className="input-container">
                <input type="email" class="form-control" id="newsletter" placeholder="Email" className="newsletter"  name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
              {/* <ArrowRightAltIcon className="arrow-icon d-none d-md-block" /> */}
              <butto className='m-2 subscribe' onClick={handleSubscribe}>Subscribe</butto>
            </div>
          </div>
        </div> 
        <div className="row mt-md-5 d-flex align-items-center justify-content-center">
          <div className="col-12 col-md-4">
           <div className="footer-logo">
           <a class="" href="/">
            <img src={fLogo} alt="footer logo" className='footer_logo w-100' />
            <p className='text-white d-none'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam quidem beatae iure aliquam ducimus, asperiores nihil voluptates quis quia cum!</p>
          </a>
           </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center flex-column">
         <div className="footer-menus">
         <h5 className='menu-head'>Menu</h5>
            <ul className='text-start'>
             <li className='footer-hover'><Link to="/" className='text-white '>Home</Link></li> 
             <li className='footer-hover'><Link to="/Shop" className='text-white '>Shop</Link> </li>
             <li className='footer-hover'><Link to="/Contact" className='text-white '>Contact</Link></li>
            </ul>
         </div>
          </div>
          <div className="col-md-4">
          <div className="footer-menus contact-menu d-none">
         <h5 className='menu-head'>Contact</h5>
            <ul className='text-start footer-lists'>
              <li>Address: 22b,Baker street,London</li>
              <li>Email:<Link to="mailto:someone@example.com" className='text-white'>example@example.com</Link> </li>
              {/* <li><strong>Contact</strong></li> */}
            </ul>
         </div>
         <div className="footer-menus">
         <h5 className='menu-head'>Contact</h5>
            <ul className='text-start'>
             <li className='text-white text-centers'>Address: 22b,Baker street,London</li> 
             <li className='text-centers footer-hover'>Email:<Link to="mailto:someone@example.com" className='text-white'>example@example.com</Link> </li>
             <li><Link to="/Contact" className='footer-hover text-white visibility-hidden'>Contact</Link></li>
            </ul>
         </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer