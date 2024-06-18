import React, { useState } from 'react'
import Header from '../components/mainComponent/Header'
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userRegister, verifiyUser } from '../services/products/Products';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop'; 
import OtpInput from 'react-otp-input';


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const[isLoading,setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({
      name:'',
      email:'',
      phoneNo:'',
      password:'',
      otp:''
    })

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };
    const sendOtp = () =>{
      if(!user.name.trim()){
        toast.error('Name is Required')
      }else if(!user.email.trim()){
        toast.error('Email is required')} 
      else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
        toast.error("Please enter a valid email address");
        // setIsLoading(false);
        return false;
      }else if(!user.phoneNo.trim()){
        toast.error('Phone No is required')} 
      else if(!user.password.trim()){
        toast.error('Password is required')
      }else if(!confirmPassword.trim()){
        toast.error('Confirm Password is required')}  
      else if(user.password !== confirmPassword){
        toast.error('Passwords do not match')
        return false;
      }else{
        setIsLoading(true)
        let body={email:user.email} 
      verifiyUser(body).then((res)=>{
        if(res.status === 200){
          setOpen(true)
          setIsLoading(false)
        }else{
          if (res.data.message.includes('Email')) {
            toast.error('Email already exists');
          }
          if (res.data.message.includes('Phone')) {
            toast.error('Phone number already exists');
          }
          setIsLoading(false);
        }
      }).catch((error)=>{
        toast.error("please enter valid OTP")
        setIsLoading(false)
      })
      }
    }

     const handleRegisterUser = () =>{ 
      if(!otp.trim()){
        toast.error('OTP Required')
      }else{
        setIsLoading(true)
        const payload = {
         name:user.name,
          email:user.email,
           phoneNo: user.phoneNo,
            password: user.password,
            otp:otp
        }
       userRegister(payload).then((res)=>{
          if(res.status === 200){
           setOpen(false)
           setIsLoading(false)    
           toast.success('Registered Successfully')
           setUser({
             name: '',
             email: '',
             phoneNo: '',
             password: '',
             otp: ''
           });
           setConfirmPassword('');
           setOtp('');
          }else{
            toast.error(res?.data?.message);
            setIsLoading(false)
          }
       }).catch((error)=>{
         console.log(error)
         setIsLoading(false)
       })
      } 
      
     }

     const handleOnChange = (e) => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      });
    };

  const showPasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }
  const showConfirmPasswordVisibility = () =>{
    setShowConfirmPassword(!showConfirmPassword)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <>
     <Loader isLoading={isLoading}/>
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
     <div className="shop-container">
      <div className="contact-header">
          <Header /> 
      </div>
        <div className="d-none shop-hero-section">
          <div className="shop-inner text-center d-flex align-items-center justify-content-center gap-2">
            <HomeIcon className="fs-1 home-icon pb-2" />
            <h4>
              <Link to='/'>Home</Link>{" "}
              <span>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </h4>
            <h2>SignUp</h2>
          </div>
        </div>
        <div className="login-container mt-5 mb-5 p-md-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center ">
              <div className="col-12 col-md-6 p-md-0"> 
                <div className="login-form d-flex align-items-center justify-content-center mx-auto flex-column">
                    <div className="signup-for-login mb-5 d-flex align-items-center gap-2">
                        <ExitToAppIcon className='text-white'/>
                        <button className='login-to-signup'><Link to='/login'>Login</Link></button>
                    </div>
                 <h2 className='text-dark pt-4 mb-4'>Register Yourself!</h2>
                  <div className="email name mb-2">  
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"  
                      className="form-control newsletter login-email p-3"
                      name="name"
                      value={user.name}
                      onChange={(e)=>handleOnChange(e)}
                    />
                  </div>
                  <div className="email mb-2">  
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email" 
                      className="form-control newsletter login-email p-3"
                      name="email"
                      value={user.email}
                      onChange={(e)=>handleOnChange(e)}
                    />
                  </div>
                  <div className="email mb-2">  
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter your Phone No" 
                      className="form-control newsletter login-email p-3"
                      name="phoneNo"
                      value={user.phoneNo}
                      onChange={(e)=>handleOnChange(e)}
                    />
                  </div>
                  <div className="password mb-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      className="newsletter login-password p-3"
                      name="password"
                      value={user.password}
                      onChange={(e)=>handleOnChange(e)}
                    />
                    <button className='toggle-btn' 
                    onClick={showPasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                  </div>
                  <div className="password confirm_password mb-2">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      placeholder="Enter your password"
                      className="newsletter login-password p-3"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e)=>handleConfirmPasswordChange(e)}
                    />
                    <button className='toggle-btn' 
                    onClick={showConfirmPasswordVisibility}>
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                  </div>
                  <div className="login-button">
                  <button className="send" onClick={sendOtp}>Register</button>
                  </div>
                </div> 
              </div>
              <div className="col-md-6 p-0 d-none d-md-block">
                <div className="signup-image" loading="lazy-loading"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        BackdropProps={{
          onClick: (event) => event.stopPropagation()
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="verify-modal">
              <h3 className='text-center'>Verify</h3>
              <p className='text-center'>Your code was sent to you via email</p>
              <OtpInput
              value={otp}
              onChange={setOtp} 
              numInputs={4}
              placeholder={false}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} className='w-50 p-2 otp-input' placeholder='0'/>}  
            />
             <div className="text-center mt-3">
             <button className='veify-btn' onClick={handleRegisterUser}>Verify</button>
             </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default SignUp