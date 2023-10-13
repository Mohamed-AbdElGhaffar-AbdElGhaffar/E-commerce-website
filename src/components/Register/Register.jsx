import React, { useState } from 'react'
import style from '../Register/Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [err,setErr] = useState(null);
  async function sendData(values) {
    setIsLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values).catch((err)=>{
      // console.log(err.response.data.message);
      setErr(err.response.data.message);
      setIsLoading(false);
    })
    // console.log("response",data);
    if (data.message=="success") {
      setIsLoading(false);
      navigate('/login')
    }
  }
  // function validate(values) {
  //   let emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   let errors = {};
  //   if (values.name =='') {
  //     errors.name = 'Name is Required'
  //   }else if(values.name.length < 3){
  //     errors.name = 'Name must be more than 3'
  //   }else if(values.name.length > 15){
  //     errors.name = 'Name must be less than 15'
  //   }

  //   if (values.email =='') {
  //     errors.email = 'Email is Required'
  //   }else if(!emailRegx.test(values.email)){
  //     errors.email = 'Email Format Notvalid'
  //   }

    


  //   return errors;
  // }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema = Yup.object({
    name:Yup.string().min(3,"Name must be more than 3").max(15,"Name must be less than 15").required("Name is Required"),
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    phone:Yup.string().matches(phoneRegExp,"Mobile is Notvalid").required("Mobile is Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/,"Password format not valid ").required("Password is Required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"rePassword format not valid").required("rePassword is Required")

  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    },
    // validate,
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
      <title>sign-up component</title>
    </Helmet>
    <div className='container' >
      <h3>register now</h3>
      {err?<div className='alert alert-danger'>{err}</div>:''}
      
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="userName">Name :</label>
        <input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} id='userName' className='form-control mb-3' type="text" />
        
        {formik.errors.name && formik.touched.name?<div className='alert alert-danger mt-2'>{formik.errors.name}</div>:null}

        <label htmlFor="userEmail">Email :</label>
        <input name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='userEmail' className='form-control mb-3' type="text" />
        
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

        <label htmlFor="userPhone">Phone :</label>
        <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='userPhone' className='form-control mb-3' type="tel" />
        
        {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger mt-2'>{formik.errors.phone}</div>:null}

        <label htmlFor="userPassword">Password :</label>
        <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='userPassword' className='form-control mb-3' type="password" />

        {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}

        <label htmlFor="userrePassword">RePassword :</label>
        <input name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} id='userrePassword' className='form-control mb-3' type="password" />

        {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger mt-2'>{formik.errors.rePassword}</div>:null}

        {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-success my-4'>Register</button>}

      </form>
    </div>
  </>
}
