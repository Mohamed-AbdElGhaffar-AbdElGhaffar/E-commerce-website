import React from 'react'
import style from '../NotFound/NotFound.module.css'
import imgNotfound from '../../Assets/Images/error.svg'

export default function NotFound() {
  return <>
  
  <div className='d-flex justify-content-center align-items-center'>
    <img src={imgNotfound} alt="error" />
  </div>

  </>
}
