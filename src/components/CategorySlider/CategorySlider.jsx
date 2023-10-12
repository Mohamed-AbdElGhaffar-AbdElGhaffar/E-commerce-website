import React from 'react'
import style from '../CategorySlider/CategorySlider.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };

  function getCategorySlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {isLoading,data} = useQuery('getCategorySlider', ()=>getCategorySlider());
  // console.log("CategorySlider",data?.data.data);
  return <>
  <div className='my-5'>
    <Slider {...settings}>
      {data?.data.data.map((item)=>(<div key={item._id}>
        <img src={item.image} height={250} className='w-100' alt={item.name} />
        <h3 className='h4 text-center fw-bolder'>{item.name}</h3>
        </div>
      ))}
    </Slider>
  </div>
  

  </>
}
