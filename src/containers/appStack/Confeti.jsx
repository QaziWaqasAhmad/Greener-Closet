import React, { useContext, useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop'; 
import { userDetailsById } from '../../services/products/Products';
import { AppContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Confeti = () => {
  const [windowDimension, setWindowDimension] = useState({width: window.innerWidth, height: window.innerHeight})
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const { user,login} = useContext(AppContext);
  console.log(user.userDetails?._id, "sadasdsada")
  const navigate = useNavigate()

  useEffect(()=>{
    handleUsersDetialsById();
  },[])
  useEffect(() => {
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])
   const handleUsersDetialsById = () =>{
    userDetailsById(user.userDetails?._id).then((res)=>{ 
      console.log(res, "neeeeeeeeeeeeeeeeeeeeeeeeeeew")
       if(res.status === 200){
        let newData = {
          token : user.token,
          userDetails : res?.data?.data
        }
        localStorage.setItem('users', newData)
        login(newData)
        setOpen(true)
        setInterval(() => {
          navigate('/') 
        }, 10000)
      }

    }).catch((error)=>{ 
      console.log(error)
    })
   }


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
     
  const detectSize = () => {
    setWindowDimension({width: window.innerWidth, height: window.innerHeight})
  }





  return (
    <>
    <ReactConfetti
      width={windowDimension.width}
      height={windowDimension.height}
      tweenDuration={1000}
    />
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
              <h3 className='text-center'>Payment Successful!</h3>
              <p className='text-center'>Thank you for your purchase.</p>
             <div className="text-center mt-3">
             {/* <button className='veify-btn' onClick={handleRegisterUser}>Verify</button> */}
             </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Confeti
