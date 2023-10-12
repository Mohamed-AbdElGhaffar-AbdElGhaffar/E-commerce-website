import React, { useContext, useEffect, useState } from 'react'
import style from '../Products/Products.module.css'
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from "react-helmet";
import { CounterContext } from '../../Contexts/CounterContext';
import { WishListContext } from '../../Contexts/WishListContext';
import { UserContext } from '../../Contexts/UserContext';

export default function Products() {
  let {setCounter} = useContext(CounterContext);
  let {addProductToCart} = useContext(CartContext)
  let {getWishListProduct,addProductToWishList} = useContext(WishListContext)
  // let [AllProducts,setAllProducts] = useState([]);
  // let [isLoading,setIsLoading] = useState(false);
  // async function getAllProducts() {
  //   setIsLoading(true);
  //   let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  //   console.log(data.data);
  //   setAllProducts(data.data);
  //   setIsLoading(false);
  // }

  // useEffect(()=>{
  //   getAllProducts();
  // },[])
  async function getWishListData() {
    return await getWishListProduct()
  }

  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  async function addToCart(id) {
    let {data} = await addProductToCart(id)
    console.log("producttocart",data);
    if (data?.status == "success") {
      // toster => react hot toast
      toast.success(" It has been successfully added 🛺 ")
      setCounter(data.numOfCartItems)
    }
  }
  async function addToWishList(id) {
    if (localStorage.getItem("userToken")) {
      let {data} = await addProductToWishList(id)
    console.log("producttowishlist",await addProductToWishList(id));
    if (data?.status == "success") {
      // toster => react hot toast
      toast.success(" It has been successfully added 💖 ")
      for (let i = 0; i < data?.data.length; i++) {
        // console.log(data?.data[i]);
        document.getElementById(data?.data[i]).classList.add("text-danger")
        
      }
      
    }
    }
    
  }

  let {isLoading,isFetching,data} = useQuery('getAllProducts', ()=>getProducts());
  //  console.log(data?.data.data);
  let [availableProduct,setAvailableProduct] = useState([]);
  let [test,settest] = useState(false);
  function searchProducts(value) {
    settest(true)
    let arr =[]
    data?.data.data.map((item)=>{
      if (item.title.toUpperCase().includes(value.toUpperCase())) {
        arr.push(item);
      }
    })
    setAvailableProduct(arr);
  }
  let WishData = useQuery('getWishListProduct', ()=>getWishListData());
  // console.log("wishdata",WishData);
  if (WishData) {
    WishData?.data?.data.data.map((item)=>{
    //  console.log(item._id);
    //  console.log("element",document.getElementById(item._id));
     document.getElementById(item._id)?.classList.add("text-danger")
    })
 }
  // useEffect(()=>{
  //   console.log("isLoading",isLoading);
  //   getWishListData()
    
  // },[])
  return <>
  <Helmet>
    <title>products component</title>
  </Helmet>
  <div className='container'>

  
    {isLoading?<div className='d-flex justify-content-center align-items-center'>
      <CirclesWithBar height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="" visible={true} outerCircleColor="" innerCircleColor="" barColor="" ariaLabel='circles-with-bar-loading' /> 
    </div>: <>
    <input onChange={(e)=>searchProducts(e.target.value)} type="text" placeholder='search....' className='w-75 mx-auto form-control my-5 ng-pristine ng-valid ng-touched' />
    <div className="row">
      <Toaster/>
      {
        test?availableProduct.map((item)=>(
        <div key={item._id} className="col-md-3">
          
          <div className="product px-2 py-4 rounded">
            <Link to={`/Product/${item._id}`}>
              <img src={item.imageCover} className='w-100 rounded' alt={item.title} />
              <p className='text-main'>{item.category.name}</p>
              <h2 className='h6'>{item.title.split(" ").slice(0,2).join(" ")}</h2>
              <div className='d-flex justify-content-between align-items-center'>
                <span>{item.price}EGp</span>
                <div className='d-flex align-items-center'>
                  <i className='fas fa-star rating-color'></i>
                  <span>{item.ratingsAverage}</span>
                </div>
              </div>
            </Link>
            <div className='d-flex align-items-center justify-content-center cursorPointer'>
                <button onClick={()=>addToCart(item._id)} className='w-75 btn bg-main mt-4'> + Add</button>
                <i onClick={()=>addToWishList(item._id)} id={item._id} className='fa-solid fa-heart h3'></i>
              </div>
          </div>
          
        </div>
      )):data?.data.data.map((item)=>(
        <div key={item._id} className="col-md-3">
          
          <div className="product px-2 py-4 rounded">
            <Link to={`/Product/${item._id}`}>
              <img src={item.imageCover} className='w-100 rounded' alt={item.title} />
              <p className='text-main'>{item.category.name}</p>
              <h2 className='h6'>{item.title.split(" ").slice(0,2).join(" ")}</h2>
              <div className='d-flex justify-content-between align-items-center'>
                <span>{item.price}EGp</span>
                <div className='d-flex align-items-center'>
                  <i className='fas fa-star rating-color'></i>
                  <span>{item.ratingsAverage}</span>
                </div>
              </div>
              
            </Link>
            <div className='d-flex align-items-center justify-content-center cursorPointer'>
                <button onClick={()=>addToCart(item._id)} className='w-75 btn bg-main mt-4'> + Add</button>
                <i onClick={()=>addToWishList(item._id)} id={item._id} className='fa-solid fa-heart h3'></i>
              </div>
          </div>
          
        </div>
      ))}
    </div>
    </>
    }
  </div>
  </>
}
