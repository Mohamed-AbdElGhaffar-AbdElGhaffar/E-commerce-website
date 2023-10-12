import React, { useState } from 'react'
import style from '../Categories/Categories.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import { useQuery } from 'react-query';
import { CirclesWithBar, Watch } from 'react-loader-spinner';

export default function Categories() {
  let [specificCategoryLoading,setSpecificCategoryLoading] = useState(null);
  let [specificCategoryName,setSpecificCategoryName] = useState(null);
  let [specificCategoryData,setSpecificCategoryData] = useState(null);
  function getCategoryData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let {isLoading,data} = useQuery('getCategoryData', ()=>getCategoryData());
  // console.log("CategoryData",data?.data.data);

  async function SpecificCategoryData(id,name) {
    setSpecificCategoryName(name + " subcategories");
    setSpecificCategoryLoading(true);
    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
    console.log(data);
    setSpecificCategoryData(data);
    console.log(specificCategoryData);
    setSpecificCategoryLoading(false);
  }
  return <>
    <Helmet>
      <title>categories component</title>
    </Helmet>
    {isLoading?<div className='d-flex justify-content-center align-items-center'>
      <CirclesWithBar height="100" width="100" color="#4fa94d" wrapperStyle={{}} wrapperClass="" visible={true} outerCircleColor="" innerCircleColor="" barColor="" ariaLabel='circles-with-bar-loading' /> 
    </div>:
    <div className='container'>
      <div className='row g-4'>
      {data?.data.data.map((item)=>( 
        <div key={item._id} onClick={()=>SpecificCategoryData(item._id,item.name)} className='col-md-4'>
          <div className='card'>
            <div className='card-img'>
              <img src={item.image} className={`ratio-4x3 w-100 ${style.CategoriesImage}`} alt={item.name} />
            </div>
            <div className='card-body'>
              <p className='text-success h3 text-center fw-bolder'>{item.name}</p>
            </div>
          </div>
        </div> 
      ))}
      </div>
      {specificCategoryLoading?<div className='d-flex justify-content-center align-items-center mt-5 pt-5'>
      <Watch height="80" width="80" radius="48" color="#4fa94d" ariaLabel="watch-loading" wrapperStyle={{}} wrapperClassName="" visible={true} />
    </div>:
      <div className='subcategories '>
        <h2 className='text-center text-main my-4 fw-bolder'>{specificCategoryName}</h2>
        <div className='row gy-3'>
          {specificCategoryData?.data.map((item)=>(
            <>
              <div className='col-md-4'>
                <div className='card'>
                  <p className='h4 text-center p-3 fw-bolder'>{item.name}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    }
    </div>}
    


  </>
}
