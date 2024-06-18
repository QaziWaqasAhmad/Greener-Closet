import HomeIcon from "@mui/icons-material/Home";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutUsSection from "../../components/AboutUsSection";
import Loader from "../../components/Loader";
import Header from "../../components/mainComponent/Header";
import { sendContactDetails } from "../../services/products/Products";


const Contact = () => {
const[isLoading,setIsLoading] = useState(false)
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
const [open, setOpen] = useState(false);
const handleClose = () => setOpen(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    message: "",

  });

  const handleContact = () => {
    if(!contact.firstName.trim()){
      toast.error('FirstName is Required')
      setIsLoading(false)
    }else if(!contact.lastName.trim()){
      toast.error("LastName is Required")
      setIsLoading(false)
    }else if (!contact.email.trim()) {
      toast.error("Email is Required");
      setIsLoading(false)
    }  else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
      toast.error("Please enter a valid email");
      setIsLoading(false)
      return false;
    }else if(!contact.phoneNo.trim()){
      toast.error("Phone Number is Required")
    }else if (!/^\d+$/.test(contact.phoneNo)) {
      toast.error("Phone Number should only contain numbers");
      setIsLoading(false);
    }else if(!contact.message.trim()){
      toast.error("Message is Required")
      setIsLoading(false)
    } 
    const payload = {
      firstName:contact.firstName,
      lastName:contact.lastName,
      email:contact.email,
      phoneNo:contact.phoneNo,
      message: contact.message,
    }
    setIsLoading(true)
    sendContactDetails(payload)
      .then((res) => {
        if (res.status === 200) {
           toast.success('Form Submitted Successfully')
          setIsLoading(false)
          setContact({
            firstName:'',
            lastName:'',
            email:'',
            phoneNo:'',
            message:''
          })
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(true)
        console.log(error);
      });
  };

  const handleOnChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
        <div className="contact-section-hero d-none">
          <div className="shop-inner contact-inner text-center d-flex align-items-center justify-content-center gap-2 ">
            <HomeIcon className="fs-1 home-icon pb-2" />
            <h4>
              Home{" "}
              <span>
                <KeyboardDoubleArrowRightIcon />
              </span>
            </h4>
            <h2>Contact</h2>
          </div>
        </div>
        <div className="contact-container vh-100 d-flex align-items-center justify-content-center flex-column">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-12 col-md-5">
                <div className="left-hero-title margin-top">
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
                <div className="contact_form mx-auto text-center p-md-5">
                  <div className="row mb-3 pt-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder="Enter your first name"
                        className="newsletter mobile-field-name w-100"
                        name="firstName"
                        value={contact.firstName}
                        onChange={(e)=>handleOnChange(e)}

                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder="Enter your last name"
                        className="newsletter mobile-field w-100"
                        name="lastName"
                        value={contact.lastName}
                        onChange={(e)=>handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter your email"
                        className="newsletter mobile-field w-100"
                        name="email"
                        value={contact.email}
                        onChange={(e)=>handleOnChange(e)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        id="phoneNo"
                        placeholder="Enter your contact number"
                        className="newsletter mobile-field w-100"
                        name="phoneNo"
                        value={contact.phoneNo}
                        onChange={(e)=>handleOnChange(e)}
                      />
                    </div>
                  </div> 
                  <div className="row mb-3"> 
                    <div className="col-md-12 mobile-field"> 
                      <textarea
                        class="form-control  newsletter mx-auto  w-100"
                        id="message"
                        placeholder="Message"
                        rows="3"
                        name="message"
                        value={contact.message}
                        onChange={(e)=>handleOnChange(e)}
                      ></textarea>
                    </div>
                  </div>
                  <button className="send mb-3" onClick={handleContact}>
                    Send
                  </button>
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
              <h3 className='text-center'>Form Submitted Successfully</h3>
            </div>
          </Box>
        </Fade>
      </Modal>
      </div>
<AboutUsSection />
    </>
  );
};

export default Contact;
