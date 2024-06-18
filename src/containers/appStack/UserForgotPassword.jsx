import React, { useState } from "react";
import Header from "../../components/mainComponent/Header";
import ProductHomeSection from "../../components/ProductHomeSection";
import Fundamentals from "../../components/Fundamentals";
import BestSellingProducts from "../../components/BestSellingProducts";
import TextFeilds from "../../components/TextFeilds";
import { TextField } from "@mui/material";
import Buttons from "../../components/Buttons";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AboutUsSection from "../../components/AboutUsSection";
import {
  resetUserPassword,
  sendCodeToUser,
} from "../../services/products/Products";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import OtpInput from "react-otp-input";
import { useNavigate,Link } from "react-router-dom";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const UserForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const handleClose = () => setOpen(false);
  const navigation=useNavigate()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [user, setUser] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });

  const handleSendCodeToUser = () => {
    if (!user.email.trim()) {
      toast.error("Email is Required");
      setIsLoading(false);
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return false;
    } else if (!user.newPassword.trim()) {
      toast.error("New Password is required");
      setIsLoading(false);
    }  else if(user.newPassword.length < 6){
      toast.error('Password must be at least 6 characters long')
      setIsLoading(false)
      return false
    }else {
      const payload = {
        email: user.email,
        newPassword: user.newPassword,
      };
      setIsLoading(true);
      sendCodeToUser(payload)
        .then((res) => {
          if (res.status === 200) {
            setOpen(true);
            setIsLoading(false);
          } else {
            toast.error(res?.data?.message);
            setIsLoading(false);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    }
  };

  const handleForgotUserPassword = () => {
    const payloadUser = {
      email: user?.email,
      newPassword: user?.newPassword,
      otp: otp,
    };
    setIsLoading(true);
    resetUserPassword(payloadUser)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          setIsLoading(false);
          setUser({
            email: "",
            newPassword: "",
            otp: "",
            });
            setOtp("");
            setIsLoading(false);
            toast.success(res?.data?.message);
          setTimeout(() => {
            navigation("/login")
          }, 2000);
        }else{
          toast.error(res?.data?.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Something went wrong");
        console.log(error);
      });
  };

  const handleOnChange = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value
    })
}
       
    const showPasswordVisibility = () =>{
        setShowPassword(!showPassword)
      }


  return (
    <>
      <Loader isLoading={isLoading} />

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
      <div className="home-container">
        <div className="contact-header">
          <Header />
        </div>
        <div className="d-none contact-section-hero">
          <div className="shop-inner contact-inner text-center d-flex align-items-center justify-content-center gap-2">
            <HomeIcon className="fs-1 home-icon pb-2" />
            <h4>
              Home{" "}
              <span>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </h4>
            <h2>Forgot Password</h2>
          </div>
        </div>
        <div className="forgot-password-container mt-5 mb-5 p-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-5 d-none">
                <div className="left-hero-title">
                  <h1 className="">Feel Free To </h1>
                  <h1 className="special mb-4">Contact Us</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil deleniti perferendis quia cum inventore temporibus,
                    tempora praesentium voluptates quis natus ipsam? Doloribus
                    neque consectetur a eos delectus laboriosam at? Quia, qui
                    repellendus nulla consectetur autem inventore numquam omnis
                    veritatis hic. Molestias molestiae, fuga fugit quasi
                    blanditiis harum beatae possimus nulla!
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <div className="contact_form forgot__password mx-auto text-center p-5">
                  <div className="email mb-3 mt-3">
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="form-control newsletter login-email p-3 w-100"
                      name="email"
                      value={user.email}
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div className="password mb-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      placeholder="Enter your new password"
                      className="newsletter login-password p-3 w-100"
                      name="newPassword"
                      value={user.newPassword}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <button
                      className="toggle-btn"
                      onClick={showPasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </button>
                  </div>
                  <button className="send" onClick={handleSendCodeToUser}>
                    FORGOT
                  </button>
                  <div className="forgot-password d-flex align-items-center justify-content-center flex-column mt-3">
                    <HelpOutlineIcon className='forgot-icon fs-2 text-white mb-2'/>
                  <Link to='/login' className="forgot-button text-white ">Login !</Link> 
                  </div>
                </div>
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
          onClick: (event) => event.stopPropagation(),
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="verify-modal">
              <h3 className="text-center">Verify</h3>
              <p className="text-center">Your code was sent to you via email</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                placeholder={false}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-50 p-2 otp-input"
                    placeholder="0"
                  />
                )}
              />
              <div className="text-center mt-3">
                <button
                  className="veify-btn"
                  onClick={handleForgotUserPassword}
                >
                  Verify
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default UserForgotPassword;
