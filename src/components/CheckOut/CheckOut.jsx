import React, { useContext } from 'react'
import style from '../CheckOut/CheckOut.module.css'
import { useFormik } from 'formik'
import { InfinitySpin } from 'react-loader-spinner';
import * as Yup from 'yup';
import { CartContext } from '../../Contexts/CartContext';
import { useParams } from 'react-router-dom';

export default function CheckOut() {
  let {id} = useParams()
  let {pay} = useContext(CartContext)
  const handelPaymentDetails =async (values)=>{
    let {data} = await pay(values,id)
    if (data.status === "success") {
      window.location.href = data.session.url
    }
    
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema = Yup.object({
    details:Yup.string().min(3,"details min length is 3").required("Email is Required"),
    phone:Yup.string().matches(phoneRegExp,"Mobile is Not valid").required("phone is required"),
    city:Yup.string().required("city is required")
  })
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    validationSchema,
    onSubmit:handelPaymentDetails
  })
  return <>
  
    <div className='w-75 mx-auto'>
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="Details">Details</label>
        <input name='details'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} id='Details' className='form-control mb-3 ng-untouched ng-pristine ng-invalid' type="text" />
        
        {formik.errors.details && formik.touched.details?<div className='alert alert-danger mt-2'>{formik.errors.details}</div>:null}
        
        
        <label htmlFor="Phone">phone</label>
        <input name='phone'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='Phone' className='form-control mb-3 ng-untouched ng-pristine ng-invalid' type="tel" />
        
        {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger mt-2'>{formik.errors.phone}</div>:null}
        
        
        <label htmlFor="City">city</label>
        <input name='city'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} id='City' className='form-control mb-3 ng-untouched ng-pristine ng-invalid' type="text" />
        
        {formik.errors.city && formik.touched.city?<div className='alert alert-danger mt-2'>{formik.errors.city}</div>:null}

        
        {/* {isLoading?<InfinitySpin  width='200' color="#4fa94d" /> :*/}
        <button type='submit' className='btn btn-outline-info w-100 my-5'>Pay now</button>
        {/* } */}

      </form>
    </div>

  </>
}
