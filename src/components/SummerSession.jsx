import React from 'react'
const SummerSession = () => {
  return (
    <>
    <div className="summer-session d-flex align-items-center justify-content-center margin-top">
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-12 col-md-6">
                <div className="summer-left">
                        <h2 >Summer <span className='blue'>Session '24</span> </h2>
                        <h2 >finest collection </h2>
                        <button className='rating-works-btn'>Know more</button>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="summer-desc">
                        <p className='w-75 summer-para'>Experience our new summer season collection of year 2024. The focus is on light and breezy clothes to  make you comfy.</p>
                        <p className='w-75 summer-para'>Keeping your comfort in mind, we Experience our new summer season collection of year 2024. The focus is on light and breezy clothes to  make you comfy.</p>
                    </div>
                </div>
            </div>
            <div className="row mt-4 d-flex align-items-center justify-content-center">
               <div className="col-12 col-md-4">
                <div className="summer-first-image">
                <div class="card summer-image p-3">
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
               </div>
               <div className="col-12 col-md-4">
                <div className="summer-second-image">
                <div class="card summer-second-half p-3">
                      <div class="card-body">
                        <div className="top_btn mx-auto">
                        <button className="carousel-top-btn">70% Polyester</button>
                        </div>
                        <div className="bottom_btn mx-auto">
                        <button className="carousel-bottom-btn">CCC red shirt</button>
                        </div>
                      </div>
                    </div>
                <div class="card summer-second-half-two p-3">
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
               </div>
               <div className="col-12 col-md-4">
                <div className="summer-third-image">
                <div class="card summer-first p-3">
                      <div class="card-body">
                        <div className="w-100">
                        <p className='text-white signifies'>What this collection signifies?</p>
                        <button className='summer-read-more'>Read on </button>
                        </div>
                        {/* <div className="bottom_btn mx-auto">
                        <button className="carousel-bottom-btn">CCC red shirt</button>
                        </div> */}
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

export default SummerSession