import React, { useContext, useState } from 'react'
import style from '../ForgetPassword/ForgetPassword.module.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Helmet} from "react-helmet";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

export default function ForgetPassword() {
  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [err,setErr] = useState(null);
  
  async function sendData(values) {
    setIsLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values).catch((err)=>{
      // console.log(err.response.data.message);
      setErr(err.response.data.message);
      setIsLoading(false);
    })
    // console.log("response",data);
    if (data.statusMsg=="success") {
      setIsLoading(false);
      navigate('/verify-code')
    }
  }

  let validationSchema = Yup.object({
    email:Yup.string().email("Email Format Notvalid").required("Email is Required")
  })

  let formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
      <title>forget-password</title>
    </Helmet>
    <div className='container'>
      <h2>please enter your verification code</h2>
      {err?<div className='alert alert-danger'>{err}</div>:''}
      <form onSubmit={formik.handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="Email" className="mb-3" >
          <Form.Control name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" placeholder="name@example.com" />
        </FloatingLabel>
        {/* <label htmlFor="userEmail">Email :</label>
        <input name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='userEmail' className='form-control mb-3' type="text" /> */}
        
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

          
        {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-lg me-auto btn-outline-success my-3'>verify</button>}
          
      </form>
    </div>

  </>
}
