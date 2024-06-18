import React, { useContext, useState } from 'react'
import logo from "../../assets/logo.png"
import { Link, useLocation } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../../context';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PaymentModal from '../PaymentModal';
import upgradePic from "../../assets/summer-two.png"
import { loadStripe } from '@stripe/stripe-js';
import { paymentGateway } from '../../services/products/Products';
import menu from "../../assets/menu.png"
import Loader from '../Loader';


const Header = () => {
  const { user,userLogout} = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const handlePaymentModalClose = () => setPaymentModalOpen(false);
  const handlePaymentModalOpen = () => setPaymentModalOpen(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleModalClose = () => setOpen(false); 
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500 ,
    overflowY:'scroll',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius:"10px",
    p: 4,
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStripe=async()=>{
   
    const stripe=await loadStripe("pk_test_51PMZGKP8piVCZH42lXe8zrS0I97394dnEKxazjZhvgzMslk60EIOcDMwaLWNX5NCbGDPuzY4z85Z3abwHOMUThnU00wxnggLhE")
    const product={
      name:"Subscription for score",
      price:12,
      userId:user?.userDetails?._id
    }
    setIsLoading(true)
    const body={
      products:product
    }
    const response=await paymentGateway(body,user?.token)
    if (response?.status==200) {
      const result=await stripe.redirectToCheckout({
        sessionId:response?.data?.id
      })
      setIsLoading(false)
    }else{
      setIsLoading(false)
    }
   

    if (result?.error) {
      setIsLoading(false) 
    }
  }
  return (
    <>
    <Loader isLoading={isLoading}/>


    <nav class="navbar navbar-expand-lg d-md-block d-none "> 
  <div class="container">
    <div className="nav-row d-flex align-items-center justify-content-center">
    <Link class="navbar-brand" to="/">
      <img src={logo} alt="logo" className='logo' />
    </Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav custom-border me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={getNavLinkClass('/')} aria-current="page" to="/">Home</Link> 
        </li>
        <li class="nav-item">
          <Link class={getNavLinkClass('/Contact')} aria-current="page" to="/Contact">Contact</Link>
        </li>
        <li class="nav-item">
          <Link class={getNavLinkClass('/Shop')} aria-current="page" to="/Shop">Shop</Link>
        </li>
      </ul>
    </div>
    </div>
      <div className="sign-up d-flex align-items-center justify-content-center gap-2">
      {user ? (
       <Stack direction="row" spacing={2}>
       <Avatar alt={user.name} src={user.avatarUrl || ''} onClick={handleAvatarClick} style={{ cursor: 'pointer' }} />
       <Menu
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={handleClose}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'center',
         }}
         transformOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
         PaperProps={{
          style: {
            width: '230px',  
            height: '204px',
          },
        }}
       >
        <div className="upgrade-menu">
          <div className="user-info text-center p-2">
            <h6 className='uppercase'>{user.userDetails.name}</h6> 
          <h6 className='user-email-info text-muted'>{user.userDetails.email}</h6> 
         <Link to="/profile" className=''><h6 className='fw-bold text-primary underline'>My Profile</h6> </Link>
          </div>
          {!user?.userDetails?.isPaid == true ? (
            <li className='text-center user-upgrade text-center mx-auto w-75 p-2' onClick={handleOpen}>🔒Upgrade</li>
          ) : (
            <li className='text-center user-upgrade text-center mx-auto w-75 p-2'>Upgraded</li>  
          ) }
         
          <div className="logout-btn mt-3 text-center fs-6">
          <span className='text-center'><Link onClick={userLogout} className='text-dark'><i class="fa-solid fa-right-from-bracket"></i> Logout</Link></span>
          </div>
        </div>
       </Menu>
     </Stack>
      ):(
        <>
        <Link to='/login'><button className='border-button'>LOGIN</button></Link>
        <Link to='/signup'><button className='sign-up-button'>SIGNUP</button></Link> 
        </>
      )}
      </div>
  </div>
    </nav>



{/* mobile navbar */}

    <nav class="navbar navbar-expand-lg navbar-light d-block d-md-none">
  <div class="container-fluid">
  <Link class="navbar-brand" to="/">
      <img src={logo} alt="logo" className='logo' />
    </Link>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon border-0"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav custom-border me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={getNavLinkClass('/')} aria-current="page" to="/">Home</Link> 
        </li>
        <li class="nav-item">
          <Link class={getNavLinkClass('/Contact')} aria-current="page" to="/Contact">Contact</Link>
        </li>
        <li class="nav-item">
          <Link class={getNavLinkClass('/Shop')} aria-current="page" to="/Shop">Shop</Link>
        </li>
        
         {user && (
          <>
          <li class="nav-item mx-auto text-center">
        <Link to="/profile" class={getNavLinkClass('/Shop')} aria-current="page">My Profile</Link>
        </li>
          <li class="nav-item text-center mx-auto m-auto pt-2 pb-3">
        <span className='text-center'><Link onClick={userLogout} className='text-dark '><i class="fa-solid fa-right-from-bracket"></i> Logout</Link></span>
        </li>
          </>
         )}
        <li class="nav-item text-center mx-auto m-auto pt-2 pb-3">
        <div className="sign-up d-flex align-items-center justify-content-center gap-2">
      {user ? (
       <>
          {!user?.userDetails?.isPaid == true ? (
            <li className='text-center user-upgrade text-center mx-auto w-75' onClick={handleOpen}>🔒Upgrade</li>
          ) : (
            <li className='text-center user-upgrade text-center mx-auto w-75 p-2'>Upgraded</li> 
          ) }
         </>
         
      ):(
        <>
        <Link to='/login'><button className='border-button'>LOGIN</button></Link>
        <Link to='/signup'><button className='sign-up-button'>SIGNUP</button></Link> 
        </>
      )}
      </div>
        </li>
      </ul>
    </div>
  </div>
</nav>


       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }} 
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="upgrade text-center">
               <h3 className="mb-4">Upgrade Your shopping</h3>
               <img src={upgradePic} alt="Upgrade" className="w-100 mb-3" /> 
               <h5>Conscious Pro $7.99 /mo</h5>
               <p className="text-secondary">Improve your health and longevity by accessing the most up to  date research and scientific data on health products recommended for you.</p>
               <div className="upgrade-box text-start p-2 text-dark">
                 <div className="points ">
                  <span>1-Unlock all ratings and data</span>
                 </div>
                 <div className="points">
                  <span>2-Bottled water, filters and tap water</span>
                 </div>
                 <div className="points">
                  <span>3-Oasis AI</span>
                 </div>
                 <div className="points">
                  <span>4-Personalized recommendations</span>
                 </div>
                 <div className="points">
                  <span>5-Private community</span>
                 </div>
               </div>
               <button className="upgrade-btn mt-3" onClick={handleStripe}>UPGRADE</button>
               <PaymentModal paymentModalOpen={paymentModalOpen} setPaymentModalOpen={setPaymentModalOpen} handlePaymentModalClose={handlePaymentModalClose} handlePaymentModalOpen={handlePaymentModalOpen} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Header