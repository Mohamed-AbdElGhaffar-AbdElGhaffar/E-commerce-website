import React, { useContext } from 'react'
import style from '../AllOrders/AllOrders.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import { CirclesWithBar } from 'react-loader-spinner';

export default function AllOrders() {
  function getAllUserOrder() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem('userId')}`);
  }

  let {isLoading,isFetching,data} = useQuery('getAllUserOrder', ()=>getAllUserOrder());
  // console.log("This is the order data",data?.data);
  return <>
    
    {isLoading?<div className='d-flex justify-content-center align-items-center'>
      <CirclesWithBar height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="" visible={true} outerCircleColor="" innerCircleColor="" barColor="" ariaLabel='circles-with-bar-loading' /> 
      </div>:
      <div className='container py-5 my-5 p-5 bg-light rounded'>
        <h2 className='text-center fw-bold'>Order History</h2>
        <div className='row bg-opacity-10 rounded-3 gap-4 justify-content-center p-2'>
          {data?.data.map((item)=>(
            <div key={item._id} className="col-lg-9 col-md-12 p-2 rounded-4 bg-primary bg-opacity-10 ">
                
              <div className='mb-3'>
                <small className='d-flex justify-content-end  me-3'>Date :&nbsp;<span className='text-danger'>{item.paidAt.split("T")[0]}</span></small>
                <small className='d-flex justify-content-end  me-3'>Time :&nbsp;<span className='text-danger'>{item.paidAt.split("T")[1].split(".")[0]}</span></small>
              </div>
              <h3 className='card-title text-center fw-bold mb-2'>Total Price : <span className='text-main'>${item.totalOrderPrice}</span> </h3>

              <div className='row mx-0'>
                {item.cartItems.map((product)=>(
                  <>
                    <div className='col-md-2 col-sm-8 offset-md-0 offset-sm-2 mb-3'>
                      <img src={product.product.imageCover} className='w-100 rounded-3' height={100} alt={product.product.title} />
                    </div>
                    <div className='col-md-10'>
                      <div className='d-flex justify-content-between align-items-center h-100 w-100'>
                        <div className=' '>
                          <small className='text-main'>{product.product.category.name}</small>
                          <h5>{product.product.title.split(" ").slice(0,2).join(" ")}</h5>
                        </div>
                        <div className='d-flex flex-column '>
                          <p className='h6 fw-bold'> Price : <span className='text-success'>{product.price}$</span> </p>
                          <p className='h6 fw-bold'> Count : <span className='text-success'>{product.count}</span> </p>
                        </div>
                      </div>
                      
                    </div>
                  </>
                ))}
                
              </div>
                  
            </div>
          ))}
          
        </div>
      </div>
    }
    
      

  </>
}
