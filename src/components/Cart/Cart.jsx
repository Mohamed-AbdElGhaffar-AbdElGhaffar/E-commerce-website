import React, { useContext, useEffect, useState } from 'react'
import style from '../Cart/Cart.module.css'
import { CartContext } from '../../Contexts/CartContext'
import { CirclesWithBar, RotatingLines } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { CounterContext } from '../../Contexts/CounterContext';

export default function Cart() {
  let {setCounter} = useContext(CounterContext);
  let navigate = useNavigate();
  let [cartData,setCartData]=useState(null);
  let [isLoading,setIsLoading] = useState(false);
  let {getCartProduct,updateProductToCart,deleteCartProduct,clearCartProduct,setUserId} = useContext(CartContext)
  async function getCartData() {
    let {data} = await getCartProduct()
    setCartData(data);
    // console.log("getCartData = ",data);
    // console.log("cartOwner",data?.data.cartOwner);
    setUserId(data?.data.cartOwner)
    localStorage.setItem('userId',data?.data.cartOwner)
  }
  async function updateCount(id,count) {
    if(count>0){
      setIsLoading(true);
      let {data} = await updateProductToCart(id,count)
      setCartData(data);
      setIsLoading(false);
    }else{
      deleteItem(id);
    }
    
  }
  async function deleteItem(id) {
    setIsLoading(true);
    let {data} = await deleteCartProduct(id)
    setCounter(data.numOfCartItems);
    setCartData(data);
    setIsLoading(false);
  }
  async function clearCartData() {
    setIsLoading(true);
    let {data} = await clearCartProduct()
    if (data.message == "success") {
      setCounter(0);
      navigate('/');
    }else{
      toast.error(" failed clear the Products that in the cart 🛺 ")
    }
    setIsLoading(false);
  }

  useEffect(()=>{
    getCartData();
  },[])

  return <>
    {cartData?
    <>
    {cartData?.numOfCartItems != 0?
    <>
    {isLoading?<><div className='position-relative'>
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
          <h2>Cart Shop</h2>
          <button className='btn btn-primary btn-lg ng-star-inserted'>
            <Link to={`/check-out/${cartData.data._id}`} className='text-decoration-none text-white'>check out</Link>
          </button>
        </div>

        <div className='d-flex justify-content-between align-items-center ng-star-inserted'>
          <h5>total price: <span className='text-main'>{cartData?.data.totalCartPrice}</span></h5>
          <h5>total number of items: <span className='text-main'>{cartData?.numOfCartItems}</span></h5>
        </div>

        {cartData?.data.products.map((item)=>(
          <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted'>
            <div className='col-md-2'>
              <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
            </div>
            <div className='col-md-10 d-flex justify-content-between'>
              <div>
                <h5>{item.product.title}</h5>
                <h6>{item.price} EGP</h6>
                <button onClick={()=>deleteItem(item.product._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
              </div>
              <div>
                <button onClick={()=>updateCount(item.product._id, item.count+1)} className='btn btn-brdr'><i className='fas fa-plus'></i></button>
                <span className='mx-3 fw-bold'>{item.count}</span>
                <button onClick={()=>updateCount(item.product._id, item.count-1)} className='btn btn-brdr'><i className='fas fa-minus'></i></button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={()=>clearCartData()} className='btn-brdr btn btn-lg d-block mx-auto'> Clear Your Cart</button>
        
      </div></>:<div className='container py-5 my-5 p-5 bg-light rounded'>
        <div className='d-flex justify-content-between mb-4'>
          <h2>Cart Shop</h2>
          <button className='btn btn-primary btn-lg ng-star-inserted'>
          <Link to={`/check-out/${cartData.data._id}`} className='text-decoration-none text-white'>check out</Link>
          </button>
        </div>

        <div className='d-flex justify-content-between align-items-center ng-star-inserted'>
          <h5>total price: <span className='text-main'>{cartData?.data.totalCartPrice}</span></h5>
          <h5>total number of items: <span className='text-main'>{cartData?.numOfCartItems}</span></h5>
        </div>
          
        {cartData?.data.products.map((item)=>(
          <div key={item._id} className='row border-bottom my-3 d-flex align-items-center p-2 ng-star-inserted'>
            <div className='col-md-2'>
              <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
            </div>
            <div className='col-md-10 d-flex justify-content-between'>
              <div>
                <h5>{item.product.title}</h5>
                <h6>{item.price} EGP</h6>
                <button onClick={()=>deleteItem(item.product._id)} className='btn btn-sm m-0 p-0 text-danger'><i className="fa-solid fa-trash"></i> Remove</button>
              </div>
              <div>
                <button onClick={()=>updateCount(item.product._id, item.count+1)} className='btn btn-brdr'><i className='fas fa-plus'></i></button>
                <span className='mx-3 fw-bold'>{item.count}</span>
                <button onClick={()=>updateCount(item.product._id, item.count-1)} className='btn btn-brdr'><i className='fas fa-minus'></i></button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={()=>clearCartData()} className='btn-brdr btn btn-lg d-block mx-auto'> Clear Your Cart</button>

      </div>}
    
    </>
    :<>
    <div className='container py-5 my-5 p-5 bg-light rounded'>
      <div className='d-flex justify-content-between mb-4'>
        <h2>Cart Shop</h2>
      </div>
      <p className='mx-auto h2'>your cart is empty</p>
        
    </div>
    
    </>

    
    }
    
    
    </>:<div className='container py-5 my-5 p-5 bg-light rounded'>
      <div className='d-flex justify-content-between mb-4'>
        <h2>Cart Shop</h2>
      </div>
      <p className='mx-auto h2'>your cart is empty</p>
        
    </div>}
    

  </>
}
