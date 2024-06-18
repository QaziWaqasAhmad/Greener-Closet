import { Visibility, VisibilityOff } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/mainComponent/Header';
import Loader from "../components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from "../services/products/Products";
import { AppContext } from "../context";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { login} = useContext(AppContext);
  
  const[isLoading,setIsLoading] = useState(false)
  const[user, setUser] = useState({
    email:'',
    password:''
  })

  const userLogin = () =>{
    if(!user.email.trim()){
      toast.error('Email is Required')
    }else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      toast.error("Please enter a valid email address");
      // setIsLoading(false);
      return false;
    }    else if(!user.password.trim()){
      toast.error('Password is required')
    }else{
      setIsLoading(true)
      const payload ={
        email:user.email,
        password:user.password,
      }
      loginUser(payload)
      .then((res)=>{
        if(res.status === 200){
          let data = res?.data?.data
          // console.log(data, "datatatatatatatatataatatatta")
          localStorage.setItem('users', data)
          login(data)
          setIsLoading(false)
        }else{
          toast.error(res?.data?.message)
          setIsLoading(false)
        }
  
      }).catch((error)=>{
        toast.error("Somethig went wrong")
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
        <div className="shop-hero-section d-none">
          <div className="shop-inner text-center d-flex align-items-center justify-content-center gap-2">
            <HomeIcon className="fs-1 home-icon pb-2" />
            <h4>
              <Link to='/'>Home</Link>{" "}
              <span>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </h4>
            <h2>Login</h2>
          </div>
        </div>
        <div className="login-container p-md-5 mt-5 mb-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center ">
              <div className="col-12 col-md-6 col-lg-6 m-md-0 p-md-0 d-none d-md-block">
                <div className="login-image"></div>
              </div>
              <div className="col-12 col-md-6 col-lg-6 p-md-0 m-md-0 ">  
                <div className="login-form d-flex align-items-center justify-content-center mx-auto flex-column">
                    <div className="signup-for-login mb-5 d-flex align-items-center gap-2">
                        <ExitToAppIcon className='text-white'/>
                        <button className='login-to-signup'><Link to='/signup'>SignUp</Link></button>
                    </div>
                 <h2 className='text-dark pt-5'>WELCOME BACK!</h2>
                  <div className="email mb-3 mt-3">
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
                  <div className="password mb-3">
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
                  <div className="login-button mb-3">
                  <button className="send" onClick={userLogin}>LOGIN</button>
                  </div>
                  <div className="forgot-password d-flex align-items-center justify-content-center flex-column">
                    <HelpOutlineIcon className='forgot-icon fs-2 text-white mb-2'/>
                  <Link to='/forgot-password' className="forgot-button text-white ">Forgot Password!</Link> 
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

export default Login