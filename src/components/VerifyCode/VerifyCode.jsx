import React, { useContext, useState } from 'react'
import style from '../VerifyCode/VerifyCode.module.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {Helmet} from "react-helmet";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';

export default function VerifyCode() {
  let navigate = useNavigate();
  let [isLoading,setIsLoading] = useState(false);
  let [err,setErr] = useState(null);
  
  async function sendData(values) {
    setIsLoading(true);
    let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values).catch((err)=>{
      console.log(err.response.data.message);
      setErr(err.response.data.message);
      setIsLoading(false);
    })
    console.log("response",data);
    if (data.status=="Success") {
      setIsLoading(false);
      navigate('/reset-password')
    }
  }

  let validationSchema = Yup.object({
    resetCode:Yup.string().required("Code is Required")
  })

  let formik = useFormik({
    initialValues:{
      resetCode:''
    },
    validationSchema,
    onSubmit:sendData
  })
  return <>
    <Helmet>
      <title>verify-code</title>
    </Helmet>
    <div className='container'>
      <h2>reset your account password</h2>
      {err?<div className='alert alert-danger'>{err}</div>:''}
      <form onSubmit={formik.handleSubmit}>
        <FloatingLabel controlId="floatingInput" label="code" className="mb-3" >
          <Form.Control name='resetCode' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} type="text" placeholder="Leave a code here" />
        </FloatingLabel>
        {/* <label htmlFor="userEmail">Email :</label>
        <input name='email'onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='userEmail' className='form-control mb-3' type="text" /> */}
        
        {formik.errors.resetCode && formik.touched.resetCode?<div className='alert alert-danger mt-2'>{formik.errors.resetCode}</div>:null}

          
        {isLoading?<InfinitySpin  width='200' color="#4fa94d" />:<button  type="submit" className='btn btn-lg me-auto btn-outline-success my-3'>verify</button>}
          
      </form>
    </div>

  </>
}
