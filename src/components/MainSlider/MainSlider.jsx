import React from 'react'
import style from '../MainSlider/MainSlider.module.css'
import BannerOne from '../../Assets/Images/slider-image-1.jpeg'
import BannerTwo from '../../Assets/Images/slider-image-2.jpeg'
import BannerThree from '../../Assets/Images/slider-image-3.jpeg'
import BlogOne from '../../Assets/Images/blog-img-1.jpeg'
import BlogTwo from '../../Assets/Images/blog-img-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <>
  
    <div className='row g-0 justify-content-center'>
      <div className='col-md-3'>
        <Slider {...settings}>
          <img src={BannerOne} height={335.58} className='w-100' alt='BannerOne' />
          <img src={BannerTwo} height={335.58} className='w-100' alt='BannerTwo' />
          <img src={BannerThree} height={335.58} className='w-100' alt='BannerThree' />
        </Slider>
      </div>
      <div className='col-md-3'>
        <img src={BlogOne} className='w-100' alt="blog-img-1" />
        <img src={BlogTwo} className='w-100' alt="blog-img-2" />
      </div>
    </div>

  </>
}
