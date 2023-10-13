import React, { useContext, useState } from 'react'
import style from '../ResetPassword/ResetPassword.module.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Helmet} from "react-helmet";
import { useFormik } from 'formik';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

export default function ResetPassword() {
  let {setUserToken}=useContext(UserContext);
  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [err,setErr] = useState(null);
  
  async function sendData(values) {
    setIsLoading(true);
    let {data} = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values).catch((err)=>{
      // console.log(err.response.data.message);
      setErr(err.response.data.message);
      setIsLoading(false);
    })
    // console.log("response",data);
    if (data?.token) {
      setIsLoading(false);
      localStorage.setItem('userToken',data.token)
      setUserToken(data.token);
      navigate('/')
    }
  }

  let validationSchema = Yup.object({
    email:Yup.string().email("Email Format Notvalid").required("Email is Required"),
    newPassword:Yup.string().matches(/^[A-Z][a-z0-9]{5,20}/,"Password format not valid ").required("Password is Required")
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      newPassword:''
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
      <title>reset-password</title>
    </Helmet>
    <div className='container'>
      <h2>reset your account password</h2>
      {err?<div className='alert alert-danger'>{err}</div>:''}
      <form onSubmit={formik.handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="email" className="mb-3" >
          <Form.Control name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="text" placeholder="Leave a code here" />
        </FloatingLabel>
        
        {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2'>{formik.errors.email}</div>:null}

        <FloatingLabel controlId="floatingnewPassword" label="password">
          <Form.Control name='newPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} type="password" placeholder="New Password" />
        </FloatingLabel>
        {formik.errors.newPassword && formik.touched.newPassword?<div className='alert alert-danger mt-2'>{formik.errors.newPassword}</div>:null}
        
        {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-lg me-auto btn-outline-success my-3'>reset newPassword</button>}
          
      </form>
    </div>

  </>
}
