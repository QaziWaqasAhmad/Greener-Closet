import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import shirt from "../assets/shirt.jpeg";
import CategorySlider from "../components/CategorySlider";
import Header from "./mainComponent/Header";
import { singleProduct } from '../services/products/Products';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';
import { AppContext } from '../context';



const SingleProductPage = () => {
  const { user} = useContext(AppContext);
  const[isLoading,setIsLoading] = useState(false)
 const [singleProductData, setSingleProductData] = useState({})
 const [selectedImage, setSelectedImage] = useState('')

   const handleImageClick = (image) => {
    setSelectedImage(image)
   }


 const { id } = useParams();
  useEffect(()=>{
    handleData()
  },[])

  const handleData = () =>{
    setIsLoading(true)
      singleProduct(id).then((res)=>{
        if(res.status === 200){
           const data = res?.data?.data
           setSingleProductData(data)
           if (data?.images?.length > 0) {
            setSelectedImage(data.images[0]);
          }
           setIsLoading(false)
        }else{
          setIsLoading(false)
        }
      }).catch((error)=>{
        setIsLoading(false)
        console.log(error)
      })
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
    <div className="single-product-page-container">
      <div className="single pt-4"> 
        <Header/>
      </div>


      <div className="main-single-page mt-5 mb-5">
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="row">
                        <div className="col-12 col-md-12 text-center">
                        <div className="product_images">
                        {selectedImage ? ( 
                        <img src={selectedImage} alt="product-image" className='main-banner-image' />
                      ) : (
                        <p>No images available</p>
                      )}
                        </div>
                        </div>
                    </div>
                    <div className="row d-flex align-items-center justify-content-center mt-3">
                    {singleProductData?.images && singleProductData?.images.length > 0 && singleProductData?.images.map((image, index) => (
                    <div className="col-3 col-md-3 text-center" key={index}>
                      <div className="product_images banner-image-container"> 
                        <img src={image} 
                        alt="product-image" 
                        className={`banner-image ${selectedImage === image ? 'active' : ''}`}
                        onClick={() => handleImageClick(image)}
                        style={{ cursor: 'pointer' }}
                         />
                      </div>
                    </div>
                  ))}
                       
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="product-details">
                        <div className="">
                          <div className="container-fluid">
                            <div className="row d-flex align-items-center justify-content-between">
                              <div className="col-md-8">
                          <h4 className='product-title'>{singleProductData?.name}</h4>
                              </div>
                              <div className="col-md-4">
                              {user && user?.userDetails?.isPaid === true ? (
                             <div className="scoring d-flex flex-column align-items-center justify-content-center">
                               <span className='score-head'>Score</span>
                               <div className="d-flex align-items-center justify-content-center">
                               <span className='fw-bold fs-4'>{singleProductData?.score} <small className='fw-light'>/100</small></span>
                               </div>
                             </div>
                          ):(
                           <>
                             <div className="scoring d-flex flex-column align-items-center justify-content-center">
                            <span className='score-head fs-4'>Score</span>
                            <div className="d-flex align-items-center justify-content-center">
                            <span className='fw-bold fs-4'> <LockIcon className='pb-1 text-primary'/>   <small className='fw-light'>/100</small></span>
                            </div>
                          </div>
                           </>
                          )
                        }
                              </div>
                            </div>
                          </div>
                             <div className="brand-single">
                             <h6 className=' pb-3 p-3 fs-6 fw-bold'> <span className='price-text'>Brand </span>: {singleProductData?.brand?.slice(0, 15)} </h6>
                             </div>
                            <div className="single-cate">
                            <span className='p-3 fs-6 '><span className='price-text fw-bold'>Category</span>: {singleProductData?.category} </span>
                            </div> 
                            <div className="single-mate">
                            <h6 className='p-3'><span className='price-text fw-bold'>Material</span>: 
                               <div className="badges-box d-flex align-items-center justify-content-start mt-3 mb-3 gap-2 w-100">
                                {/* <div className="row p-3 d-flex align-items-center justify-content-center"> */}
                                  {singleProductData?.material?.map((material, index)=>(
                                    <div className="" key={index}>
                                    {/* <button className='material-butto n'>{material}</button> */}
                                    <span className="badge p-2 bg-success">{material}</span>
                                  </div>
                                  ))}
                               
                                {/* </div> */}
                               </div>
                             </h6>
                            </div>
                           
                           
                            <div className="p-3 w-100 ">
                            <h6 className='fw-bold description '>Description:</h6>
                            <div className="pro-descr">
                            <p className='w-100'>{singleProductData?.description}</p>
                            </div>
                            </div>
                          </div>                        
                          
                           <div className="text-center mx-auto">
                            <Link to={singleProductData.refferalLink} target='_blank'> 
                           <button className='single-buy-now w-75 mx-auto text-center'>BUY NOW</button>
                            </Link>
                           </div>
                    </div>
                </div>
                
            </div>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default SingleProductPage;
