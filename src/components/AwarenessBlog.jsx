import React from "react";
import FirstBlog from "../assets/1.png";
import SecondBlog from "../assets/7.png";

const AwarenessBlog = () => {
  return (
    <>
      <div className="awareness-container p-5 d-none">
          <div className="container">
            <div className="row">
           <div className="col-12 col-md-6">
           <div className="awareness-left mt-5">
              <h2>Awareness Blog</h2>
              <p class="para">Don’t know anything about environment?</p>
              <p class="para">Read our blog to be more informative</p>
            </div>
           </div>
           <div className="col-12 col-md-6">
              <div className="main-blog-image">
              <img src={FirstBlog} alt="first-blog" className="first-blog mt-3" />
              <div className="blog-desc d-flex align-items-center justify-content-between">
                <p>Strive for better environment</p>
                <span>May '24</span>
              </div>
            </div> 
              </div>
            </div>
            <div className="row">
           <div className="col-md-6 verticle-line"></div>
           <div className="col-md-6">
             <div className="d-flex align-items-center justify-content-center">
             <div className="bottom-first text-center">
                <img src={SecondBlog} alt="" className="bottom_image" />
                  <p>Strive for better environment</p>
                  <p>May '24</p>
              </div>
              <div className="bottom-first text-center">
                <img src={SecondBlog} alt="" className="bottom_image" />
                  <p>Strive for better environment</p>
                  <p>May '24</p>
              </div>
             </div>
              </div>
            </div>
          </div>
      </div>
      

      <div className="awarenes-blog-container bg-warning d-none">
        <div className="awareness-inner-container d-flex align-items-center justify-content-between">
        <div className="awareness-left">
          <h2>Awareness Blog</h2>
          <p class="para">Don’t know anything about environment?</p>
          <p class="para">Read our blog to be more informative</p>
        </div>

        <div className="awareness-right">
          <div className="first-blog">
            <img src={FirstBlog} alt="FirstBlog" className="blog-img" />
            <div className="blog-title d-flex align-items-center justify-content-between">
            <p>Why Microplastics are harmful?</p>
            <span>May '24</span>
            </div>
          </div>
         <div className="second_blog d-flex align-items-center justify-content-center ">
         <div className="second-blog d-flex text-start flex-column text-center">
          <img src={SecondBlog} alt="SecondBlog" className="second_image" />
          <p>Strive for better environment</p>
           <span>May '24</span>
          </div>
         <div className="second-blog ">
          <img src={SecondBlog} alt="SecondBlog" className="second_image" />
          <p>Strive for better environment</p>
           <span>May '24</span> 
          </div>
         </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default AwarenessBlog;
