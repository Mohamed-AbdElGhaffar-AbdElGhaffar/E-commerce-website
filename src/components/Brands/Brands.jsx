import React, { useState } from 'react'
import style from '../Brands/Brands.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import { useQuery } from 'react-query';
import { CirclesWithBar, RotatingLines } from 'react-loader-spinner';

export default function Brands() {
  let [specificBrandData,setSpecificBrandData] = useState(null);
  function getBrandsData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let {isLoading,data} = useQuery('getBrandsData', ()=>getBrandsData());

  async function SpecificBrandData(id) {
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    setSpecificBrandData(data);
  }
  return <>
    <Helmet>
      <title>brands component</title>
    </Helmet>
    {isLoading?<div className='d-flex justify-content-center align-items-center'>
      <CirclesWithBar height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="" visible={true} outerCircleColor="" innerCircleColor="" barColor="" ariaLabel='circles-with-bar-loading' /> 
      </div>:
      <>
      {/* <div className={`d-flex justify-content-center align-items-center BgDark ${style.marg}`}>
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
        </div> */}
      <div className='container'>
        <h1 className='text-main text-center mb-5 fw-bolder'>All Brands</h1>
        <div className='row g-4'>
          {data?.data.data.map((item)=>(
            
            <div key={item._id} onClick={()=>SpecificBrandData(item._id)} className='col-md-3'>
              <div data-bs-toggle="modal" data-bs-target="#exampleModal" className='card'>
                <div className='card-img'>
                  <img src={item.image} alt={item.name} className='img-fluid' />
                </div>
                <div className='card-body'>
                  <p className='text-center'>{item.name}</p>
                </div>
              </div>
            </div>
            
          ))}
        </div>
      </div>
      <div id='exampleModal' tabindex="-1" aria-labelledby="exampleModalLabel" className={`modal fade ${style.modalBG}`} aria-modal="true" role='dialog'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='container'>
                <div className='row d-flex justify-content-center align-items-center'>
                  <div className='col-md-6'>
                    <h1 className='text-main'>{specificBrandData?.data.name}</h1>
                    <p>{specificBrandData?.data.slug}</p>
                  </div>
                  <div className='col-md-6'>
                    <img src={specificBrandData?.data.image} className='img-fluid' alt={specificBrandData?.data.name} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      </>
    }
  </>
}
