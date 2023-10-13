import React, { useContext, useEffect } from 'react'
import style from '../ProductDetails/ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import { useQuery } from 'react-query';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";
import { CounterContext } from '../../Contexts/CounterContext';
import { WishListContext } from '../../Contexts/WishListContext';

export default function ProductDetails() {
  let {setCounter} = useContext(CounterContext);
  let {addProductToCart} = useContext(CartContext)
  let {addProductToWishList} = useContext(WishListContext)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  async function addToWishList(id) {
    let {data} = await addProductToWishList(id)
    // console.log(data);
    if (data.status == "success") {
      // toster => react hot toast
      toast.success(" It has been successfully added 💖 ")
      document.getElementById(id).classList.add("text-danger")
    }
  }

  async function addToCart(id) {
    let {data} = await addProductToCart(id)
    if (data.status == "success") {
      // toster => react hot toast
      toast.success(" It has been successfully added 🛺 ")
      setCounter(data.numOfCartItems)
    }
  }

  let {id} = useParams()
  function getProductDetails(x) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`);
  }

  let {isLoading,isFetching,data} = useQuery('getProductDetails', ()=>getProductDetails(id));
  // console.log(data?.data.data);
  return <>
    <Helmet>
      <title>ProductDetails component</title>
    </Helmet>
    <div className='row align-items-center container'>
      <Toaster/>
      <div className='col-md-4'>
        <Slider {...settings}>
          {data?.data.data.images.map((imgSrc)=>(
            <img src={imgSrc} alt="" />
          ))}
        </Slider>
      </div>
      <div className='col-md-8'>
            <h2>{data?.data.data.slug}</h2>
            <p>{data?.data.data.description}</p>
            <div className='d-flex justify-content-between'>
              <span>{data?.data.data.price}EGP</span>
              <div className='d-flex align-items-center'>
                <i className='fas fa-star rating-color'></i>
                <span>{data?.data.data.ratingsAverage}</span>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center mt-4'>
                <button onClick={()=>addToCart(data?.data.data._id)} className='w-75 mx-auto btn bg-main d-block'> + Add</button>
                <i onClick={()=>addToWishList(data?.data.data._id)} id={data?.data.data._id} className={`fa-solid fa-heart h3 cursorPointer ${style.heart}`}></i>
            </div>
      </div>
    </div>

  </>
}
