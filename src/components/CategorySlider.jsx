import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { clientCategory } from '../services/products/Products';
import { breakpoints } from '@mui/system';

const CategorySlider = ({ handleSelectCategory, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 5,
    infinite: true,
    speed: 500,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: "0%",
        }
      }
    ]
  };

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    clientCategory().then((res) => {
      if (res.status === 200) {
        const data = res?.data?.data;
        setCategories(data);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return ( 
    <div className="category-slider-container mb-5">
      <h4 className='text-center mb-4 underline'>CATEGORIES</h4>
      {categories?.length > 4 ? (
        <Slider {...settings} className=''>
          {categories?.map((item) => (
            <div className='p-3' key={item._id}>
              <button
                className={`category-button ${selectedCategory === item.name ? 'active' : ''}`}
                onClick={() => handleSelectCategory(item?.name)}
              >
                {item.name}
              </button>
            </div>
          ))}
        </Slider>
      ) : (
        categories?.map((item) => (
          <div className='p-3' key={item._id}>
            <button
              className={`category-button ${selectedCategory === item.name ? 'active' : ''}`}
              onClick={() => handleSelectCategory(item?.name)}
            >
              {item.name}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CategorySlider;
