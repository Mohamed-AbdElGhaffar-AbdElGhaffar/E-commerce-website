import React, { useContext, useEffect, useState } from 'react'
import style from '../WishList/WishList.module.css'
import { WishListContext } from '../../Contexts/WishListContext'
import { CirclesWithBar, RotatingLines } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CartContext } from '../../Contexts/CartContext';
import { CounterContext } from '../../Contexts/CounterContext';

export default function WishList() {
  let {setCounter} = useContext(CounterContext);
  let [WishListData,setWishListData]=useState(null);
  let [isLoading,setIsLoading] = useState(false);
  let {addProductToCart} = useContext(CartContext)
  let {getWishListProduct,deleteWishListProduct} = useContext(WishListContext)
  
  
  async function getWishListData() {
    let WishData = await getWishListProduct()
    setWishListData(WishData?.data);
    console.log("WishListData", WishListData);
    // console.log(localStorage.getItem("userToken"));
  }

  async function addToCart(id) {
    let {data} = await addProductToCart(id)
    if (data.status == "success") {
      // toster => react hot toast
      toast.success(" It has been successfully added 🛺 ");
      setCounter(data.numOfCartItems)
    }
  }


  async function deleteItem(id) {
    setIsLoading(true);
    let {data} = await deleteWishListProduct(id)
    await getWishListData()
    setIsLoading(false);
  }

  useEffect(()=>{
    console.log(localStorage.getItem("userToken"));
    
    getWishListData();
    
  },[])

  return <>
    {WishListData?
    <>
    {isLoading?
      <>
        <div className='position-relative'>
          <div className={`d-flex justify-content-center align-items-center BgDark ${style.marg}`}>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          </div>
        </div>
        <div className='container py-5 my-5 p-5 bg-light rounded'>
          <div className='d-flex justify-content-between mb-4'>
            <h2>My wish List</h2>
          </div>
          <Toaster/>
          {WishListData?.data.map((item)=>(
            <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted'>
              <div className='col-md-2'>
                <img src={item.imageCover} className='w-100' alt={item.title} />
              </div>
              <div className='col-md-10 d-flex justify-content-between'>
                <div>
                  <h5>{item.title}</h5>
                  <h6>{item.price} EGP</h6>
                  <button onClick={()=>deleteItem(item._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
                </div>
                <div>
                  <button onClick={()=>addToCart(item._id)} className='btn-brdr btn btn-lg d-block mx-auto'> add To Cart</button>
                </div>
              </div>
            </div>
          ))}
          
        </div>
      </>
      :
      <div className='container py-5 my-5 p-5 bg-light rounded'>
        <div className='d-flex justify-content-between mb-4'>
          <h2 onClick={()=>console.log(WishListData)}>My wish List</h2>
        </div>
        <Toaster/>
        {WishListData?.data.map((item)=>(
          <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted'>
            <div className='col-md-2'>
              <img src={item.imageCover} className='w-100' alt={item.title} />
            </div>
            <div className='col-md-10 d-flex justify-content-between'>
              <div>
                <h5>{item.title}</h5>
                <h6>{item.price} EGP</h6>
                <button onClick={()=>deleteItem(item._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
              </div>
              <div>
                <button onClick={()=>addToCart(item._id)} className='btn-brdr btn btn-lg d-block mx-auto'> add To Cart</button>
              </div>
            </div>
          </div>
        ))}


      </div>
      }
    
    </>
    :
    <div className='container py-5 my-5 p-5 bg-light rounded'>
      <div className='d-flex justify-content-between mb-4'>
        <h2>My wish List</h2>
      </div>
    </div>
    }
    
    
    
    

  </>
}
