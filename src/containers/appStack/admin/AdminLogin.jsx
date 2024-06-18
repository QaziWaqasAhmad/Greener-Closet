import React, { useContext, useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import logo from '../../../assets/f-logo.png'
import { adminLogin } from '../../../services/products/Products';
import { AppContext } from '../../../context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../components/Loader';
import { isMobile } from '../../../../utils';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false)
    const[isLoading, setIsLoading] = useState(false)
    const { login, adminLoginToDashboard } = useContext(AppContext);
    const [admin, setAdmin] = useState({
      email: '',
      password: ''
    })

  const showPasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    if (isMobile()) {
        alert("For a better experience, please open this website on a desktop.");
    }
}, []);

  
   const AdminLogin = () =>{
    if(!admin.email.trim()){
      toast.error('Email is Required')
    }else if (!/^\S+@\S+\.\S+$/.test(admin.email)) {
      toast.error("Please enter a valid email address");
      // setIsLoading(false);
      return false;
    }    else if(!admin.password.trim()){
      toast.error('Password is required')
    }else{
      setIsLoading(true)
      adminLogin(admin)
      .then((res)=>{
        if(res.status === 200){
          let data = res?.data?.data
          localStorage.setItem('admin', data)
          adminLoginToDashboard(data)
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
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value
    });
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
    <div className="admin-login-container">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-7 col-lg-8 p-0 d-flex align-items-center justify-content-center">
                    <div className="admin-image"></div>
                </div>
                <div className="col-md-5 col-lg-4 p-0 d-flex align-items-center justify-content-center">
                    <div className="admin-fields login-form d-flex align-items-center justify-content-center mx-auto flex-column">
                        <img src={logo} alt="logo" />
                    <h5 className='text-dark pt-3'>WELCOME BACK!</h5>
                  <div className="email mb-3 mt-3">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email" 
                      className="form-control newsletter text-white p-3"
                      name="email"
                      style={{width:'300px'}}
                      value={admin.email}
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
                      style={{width:'300px'}}
                      value={admin.password}
                      onChange={(e)=>handleOnChange(e)}
                    />
                    <button className='toggle-btn' 
                    onClick={showPasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                  </div>
                  <div className="login-button mb-3">
                  <button className="send" onClick={AdminLogin}>LOGIN</button>
                  </div>
                  <div className="forgot-password d-flex align-items-center justify-content-center flex-column">
                    <HelpOutlineIcon className='forgot-icon fs-2 text-white mb-2'/>
                  <Link to='/admin/forgot-password' className="forgot-button text-white ">Forgot Password!</Link> 
                  </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AdminLogin