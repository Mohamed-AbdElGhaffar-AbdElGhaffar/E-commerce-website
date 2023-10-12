import React, { useContext, useState } from 'react'
import style from '../Login/Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import {Helmet} from "react-helmet";

export default function Login() {
  let {setUserToken}=useContext(UserContext);
  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [err,setErr] = useState(null);
  async function sendData(values) {
      setIsLoading(true);
      let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values).catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message);
      setIsLoading(false);
    })
    console.log("response",data);
    if (data.message=="success") {
      setIsLoading(false);
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token);
      // console.log("login token",data.token);
      navigate('/')
    }
    console.log(values);
  }
  
  function ForgetPassword() {
    navigate("/forget-password")
    
  }

  let validationSchema = Yup.object({
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/,"Password format not valid ").required("Password is Required")

  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
      <title>sign-in component</title>
    </Helmet>
    <div className='container'>
      <h3>login now</h3>
      {err?<div className='alert alert-danger'>{err}</div>:''}
      
      <form onSubmit={formik.handleSubmit}>
        
        <label htmlFor="userEmail">Email :</label>
        <input name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='userEmail' className='form-control mb-3' type="text" />
        
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

        
        <label htmlFor="userPassword">Password :</label>
        <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} id='userPassword' className='form-control mb-3' type="password" />

        {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2'>{formik.errors.password}</div>:null}

        <div className='d-flex justify-content-center align-items-between my-4'>
        
          <p onClick={()=>ForgetPassword()} className={`h5 ${style.forget} fw-bold`}>forget your password ?</p>
          <div className='ms-auto'>
            {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-lg bg-main text-white'>login now</button>}
          </div>

        </div>

      </form>
    </div>
  </>
}
