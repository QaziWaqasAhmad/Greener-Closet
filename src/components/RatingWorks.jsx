import React from 'react'
import image from "../assets/1.png"
import two from "../assets/2.png"
import three from "../assets/3.png"
import four from "../assets/4.png"
import five from "../assets/5.png"
import six from "../assets/6.png"
import seven from "../assets/7.png"

const RatingWorks = () => {
  return (
    <>
     <div className="rating-works-container p-md-4  margin-top">
        <div className="container">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-md-5">
                    <div className="rating-left text-align-center pt-5">
                        <h2 className='' >Wondering how our <br /> rating works?</h2>
                        <p className='pt-3'>"Talking to Myself" is a song by American rock band Linkin Park. The song is the second single from their seventh studio album, One More Light and was released on July 25, 2017. The music video was released on July 20, 2017, the same day that Linkin Park's lead vocalist, Chester Bennington, was found</p>
                        <button className='rating-works-btn'>Know more</button>
                    </div>
                </div>
                <div className="col-12 col-md-6 ">
                    <div className="rating-image">
                        <img src={image} alt="image" className='rating_shadow' />
                    </div>
                </div>
            </div>
            <div className="row mt-md-3 d-flex align-items-center justify-content-center ">
                <div className=" col-md-7">
                    <div className="rating-image">
                        <div className="container">
                            <div className="row d-flex align-items-center justify-content-center">
                                <div className="col-12 col-md-6">
                                    <img src={five} alt="" className='mask-group mask-shadow' />
                                </div>
                                <div className="col-12 col-md-6">
                                <img src={six} alt="" className='rectangle' />
                                </div>
                            </div>
                            <div className="row d-flex align-items-center justify-content-center text-center">
                                <div className="col-12 col-md-12">
                                <img src={seven} alt="" className='extra-image' />
                                </div>
                            </div>
                        </div>
                        {/* <img src={image} alt="image" className='' /> */}
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="rating-left">
                        <h2 >Play your part in a <br /> sustainable future</h2>
                        <p className='pt-3'>"Talking to Myself" is a song by American rock band Linkin Park. The song is the second single from their seventh studio album, One More Light and was released on July 25, 2017. The music video was released on July 20, 2017, the same day that Linkin Park's lead vocalist, Chester Bennington, was found</p>
                        <div className="icons d-flex align-items-center gap-2">
                            <img src={two} alt="idea" className='two' />
                            <img src={three} alt="recycle" className='two' />
                            <img src={four} alt="enviroment" className='two' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default RatingWorks