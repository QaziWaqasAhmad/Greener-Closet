import React from 'react'
import about from '../assets/about.jpg'

const AboutUsSection = () => {
  return (
    <>
    <div className="about-container mb-5 mt-5">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-6 m-md-0 p-md-0">
                    <div className="about-image"></div>
                </div>
                <div className="col-12 col-md-6 m-0 p-0 ">
                    <div className="about-content d-flex align-items-center text-center justify-content-center flex-column p-5">
                    <h2 >Who <span className='blue'>We Are!</span> </h2>
                       <p><strong>"</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repellat nam tempore deserunt dolorum, voluptatibus dolorem, dolor dicta cum, dignissimos eaque accusamus debitis? Nisi, nesciunt autem expedita, architecto laudantium magni distinctio, sed quisquam sint corporis dolorum voluptatibus nemo illo quidem consequuntur similique id tempora? Officia et molestias nobis dolorem? Obcaecati. <strong>"</strong></p>
                       <p><strong>"</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repellat nam tempore deserunt dolorum, voluptatibus dolorem, dolor dicta cum, dignissimos eaque accusamus debitis? Nisi, nesciunt autem expedita, architecto laudantium magni distinctio, sed quisquam sint corporis dolorum voluptatibus nemo illo quidem consequuntur similique id tempora? Officia et molestias nobis dolorem? Obcaecati.<strong>"</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AboutUsSection