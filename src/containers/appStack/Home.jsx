import React, { useContext, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import AwarenessBlog from "../../components/AwarenessBlog";
import BestSellingProducts from "../../components/BestSellingProducts";
import Fundamentals from "../../components/Fundamentals";
import RatingWorks from "../../components/RatingWorks";
import SummerSession from "../../components/SummerSession";
import Header from "../../components/mainComponent/Header";
import { AppContext } from "../../context";
import ProductHomeSection from "../../components/ProductHomeSection";
import { toast,ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const { login,user} = useContext(AppContext);
  const navigate=useNavigate();
  const [search,setSearch]=useState("")

  const handleSearch=()=>{
    if (search=="") {
      toast.error("Please provide valid search name")
    }else{
      navigate(`/Shop`, { state: { search } });
    }
  }
  const settings = {
    dots: false,
    arrows: false, 
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "12%",
    responsive: [
      {
        breakpoint: 500,
        settings: { 
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0%",
        }
      }
    ],
  };
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
    <div className="home-container">
      <div className="hero-section">
        <Header />
        <div className="hero-inner d-flex align-items-center justify-content-center mt-4 pt-md-0 pt-5">
          <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-md-6">
                <div className="left-hero">
                  <div className="left-hero-title">
                    <h1 className="special">Create </h1>
                    <h1>Sustainable</h1>
                    <h1 className="special">Future</h1>
                  </div>
                  <p className="para pt-2">Buy Shopping smart</p>
                  <div className="search-for-products">
                    <input
                      type="text"
                      className="form-control search-product"
                      id="searchProducts"
                      placeholder="Search for products"
                      name="searchProducts"
                      value={search}
                      onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button className="search-product-button" onClick={handleSearch}>Search</button>
                    <p className="italic">
                      popular searches:no polyester, sustainable
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-11 col-md-6">
              <div className="home-slider w-100 mx-auto">
              <Slider {...settings}>
                  <div className="hero-carousel">
                    <div class="card hero-card p-3">
                      <div class="card-body">
                        <div className="top_btn mx-auto">
                        <button className="carousel-top-btn">70% Polyester</button>
                        </div>
                        <div className="bottom_btn mx-auto">
                        <button className="carousel-bottom-btn">CCC red shirt</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hero-carousel">
                    <div class="card hero-card p-3">
                      <div class="card-body">
                        <div className="top_btn mx-auto">
                        <button className="carousel-top-btn">70% Polyester</button>
                        </div>
                        <div className="bottom_btn mx-auto">
                        <button className="carousel-bottom-btn">CCC red shirt</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="black-section bg-dark"></div>
      <ProductHomeSection />
      <RatingWorks />
      <SummerSession/>
      <Fundamentals/>
      <BestSellingProducts/>     
      {/* <hr className="w-75" />     */}
      <AwarenessBlog/>
    </div>
     
    </>
  );
};

export default Home;
