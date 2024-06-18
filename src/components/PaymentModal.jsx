import React, { useContext, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import visa from "../assets/visa.png";
import americanexpress from "../assets/AE.png";
import mastercard from "../assets/MC.png";
import { paymentGateway } from "../services/products/Products";
import { AppContext } from "../context";
import Loader from "./Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PaymentModal = ({
  paymentModalOpen,
  setPaymentModalOpen,
  handlePaymentModalClose,
  handlePaymentModalOpen,
}) => {
  const[isLoading,setIsLoading] = useState(false)
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const handlePaymentSuccessModalOpen = () => setPaymentSuccessModal(true);
  const handlePaymentSuccessModalClose = () => setPaymentSuccessModal(false);
  // const [validationError, setValidationError] = useState({
  //   name:'',
  //   email:'',
  //   country:'',
  //   state:'',
  //   zipCode:'',
  //   userId:'',
  //   cardNo:'',
  //   cvv:'',
  //   expMonth:'',
  //   expYear:'',
  // })
  const {user,login} = useContext(AppContext)
  // console.log(user.token,"userrrrrrrrrrrrr");
  const[upgrade, setUpgrade] = useState({
    name:'',
    email:'',
    address:'',
    country:'',
    state:'',
    zipCode:'',
    userId:'',
    cardNo:'',
    cvv:'',
    expMonth:'',
    expYear:'',
  })

  const handleUpgradeUser = () =>{
    if (!upgrade.name.trim()) { 
     toast.error('Name is Required');
    } else if (!upgrade.email.trim()) {
      toast.error('Email is required');
    }else if (!/^\S+@\S+\.\S+$/.test(upgrade.email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      // return false;
    }
    else{
      setIsLoading(true)
      const payload ={
        name:upgrade.name,
        email:upgrade.email,
        address:upgrade.address,
        country:upgrade.country,
        state:upgrade.state,
        zipCode:upgrade.zipCode,
        userId:user.userDetails._id,
        cardNo:upgrade.cardNo,
        cvv:upgrade.cvv,
        expMonth:upgrade.expMonth,
        expYear:upgrade.expYear,
      }
      paymentGateway(payload,user.token)
      .then((res)=>{
        if(res.status === 200){
          let data = {
            token : user.token,
            userDetails : res?.data?.userDetails
          }
          localStorage.setItem('users', data)
          login(data)
          // console.log(res, "paymentData")
          setPaymentModalOpen(false)
          setPaymentSuccessModal(true)
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
    setUpgrade({
      ...upgrade,
      [e.target.name]: e.target.value
    });
  };

  const paymentSuccessFull = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1080,
    height: 620,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 2,
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={paymentModalOpen}
        onClose={handlePaymentModalClose}
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
        <Fade in={paymentModalOpen}>
          <Box sx={style}>
            <div className="payment-modal">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 p-0">
                    <div className="left-side">
                      <h3>BILLING ADDRESS</h3>
                      <div className="payment-inputs d-flex flex-column mt-3">
                        <label htmlFor="" className="payment-label">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="payment-field w-100"
                          name="name"
                          id="name"
                          value={upgrade.name}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="payment-inputs d-flex flex-column mt-3">
                        <label htmlFor="" className="payment-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="payment-field w-100"
                          name="email"
                          id="email"
                          value={upgrade.email}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="payment-inputs d-flex flex-column mt-3">
                        <label htmlFor="" className="payment-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="payment-field w-100"
                          name="address"
                          id="address"
                          value={upgrade.address}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="payment-inputs d-flex flex-column mt-3">
                        <label htmlFor="" className="payment-label">
                          Country
                        </label>
                        <input
                          type="text"
                          className="payment-field w-100"
                          name="country"
                          id="country"
                          value={upgrade.country}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="d-flex gap-2 mb-3">
                        <div className="payment-inputs d-flex flex-column mt-3">
                          <label htmlFor="" className="payment-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="payment-field w-100"
                            name="city"
                            id="city"
                            value={upgrade.city}
                            onChange={(e)=>handleOnChange(e)}
                          />
                        </div>
                        <div className="payment-inputs d-flex flex-column mt-3 ">
                          <label htmlFor="" className="payment-label">
                            Zip Code
                          </label>
                          <input
                            type="text"
                            className="payment-field w-100"
                            name="zipCode"
                            id="zipCode"
                            value={upgrade.zipCode}
                            onChange={(e)=>handleOnChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="right-side">
                      <div className="d-flex align-items-center gap-5">
                        <div className="">
                          <h3>PAYMENT</h3>
                        </div>
                        <div className="cards d-flex gap-2">
                          <img
                            src={visa}
                            alt="visa-card"
                            className="card-size"
                          />
                          <img
                            src={americanexpress}
                            alt="american-express"
                            className="card-size"
                          />
                          <img
                            src={mastercard}
                            alt="master-card"
                            className="card-size"
                          />
                        </div>
                      </div>
                      <div className="payment-inputs d-flex flex-column">
                        <label htmlFor="" className="payment-label">
                          Card Number
                        </label>
                        <input
                          type="text" 
                          className="payment-field w-100"
                          name="cardNo"
                          id="cardNo" 
                          value={upgrade.cardNo}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="payment-inputs d-flex flex-column">
                        <label htmlFor="" className="payment-label">
                          State
                        </label>
                        <input
                          type="text"
                          className="payment-field w-100"
                          name="state"
                          id="state"
                          value={upgrade.state}
                          onChange={(e)=>handleOnChange(e)}
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <div className="payment-inputs d-flex flex-column mt-3">
                          <label htmlFor="" className="payment-label">
                            Exp Month
                          </label>
                          <input
                            type="text"
                            className="payment-field w-100"
                            name="expMonth"
                            id="expMonth"
                            value={upgrade.expMonth}
                          onChange={(e)=>handleOnChange(e)}
                          />
                        </div>
                        <div className="payment-inputs d-flex flex-column mt-3 ">
                          <label htmlFor="" className="payment-label">
                            Exp Year
                          </label>
                          <input
                            type="text"
                            className="payment-field w-100"
                            name="expYear"
                            id="expYear"
                            value={upgrade.expYear}
                          onChange={(e)=>handleOnChange(e)}
                          />
                        </div>
                        <div className="payment-inputs d-flex flex-column mt-3 ">
                          <label htmlFor="" className="payment-label">
                            CVV
                          </label>
                          <input
                            type="text"
                            className="payment-field w-100"
                            name="cvv"
                            id="cvv"
                            value={upgrade.cvv}
                          onChange={(e)=>handleOnChange(e)}
                          />
                        </div>
                      </div>
                      <div className="payment-buttons d-flex justify-content-center gap-2">
                        {/* <button className='payment-cancel w-50  fw-bold' onClick={handlePaymentModalClose}>Cancel</button> */}
                        <button className="procced-btn w-100  fw-bold" onClick={handleUpgradeUser}>
                          Procced To Pay
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cancel-payment">
        <button className="cancel-payment bg-secondary" onClick={handlePaymentModalClose}>X</button>
      </div>
          </Box>
        </Fade>
      </Modal>
      

      {/* payment success modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={paymentSuccessModal}
        onClose={handlePaymentSuccessModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={paymentSuccessModal}>
          <Box sx={paymentSuccessFull}>
           <h2>Success</h2>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PaymentModal;
