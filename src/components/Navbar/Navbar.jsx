import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/Images/freshcart-logo.svg';
import { UserContext } from '../../Contexts/UserContext';
import { CounterContext } from '../../Contexts/CounterContext';
import { CartContext } from '../../Contexts/CartContext';


export default function Navbar() {
  let {getCartProduct} = useContext(CartContext)
  let {counter,setCounter} = useContext(CounterContext);
  let navigate = useNavigate();
  let {userToken,setUserToken}=useContext(UserContext);
  async function getCartData() {
    let {data} = await getCartProduct();
    // console.log("cart",await getCartProduct());
    // console.log(data?.numOfCartItems);
    setCounter(data?.numOfCartItems);
  }
  function logout() {
    localStorage.removeItem('userToken')
          
    setUserToken(null);
    navigate('/login')
        
  }
  if (userToken) {
    getCartData();
  }
  return  <>
      
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <Link className="navbar-brand" to=''>

       <img src={logo} alt="logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="navbar-collapse collapse show" id="navbarSupportedContent">
      

      {userToken?<ul className="navbar-nav ms-auto mb-2 mb-lg-0 ng-star-inserted">
        
        {window.location.pathname === "/"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='' >Home</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='' >Home</Link>
        </li>}

        {window.location.pathname === "/cart"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='cart' >Cart</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='cart' >Cart</Link>
        </li>}

        {window.location.pathname === "/wishList"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='wishList' >wish list</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='wishList' >wish list</Link>
        </li>}

        {window.location.pathname === "/products"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='products' >Products</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='products' >Products</Link>
        </li>}

        {window.location.pathname === "/categories"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='categories' >Categories</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='categories' >Categories</Link>
        </li>}

        {window.location.pathname === "/brands"?<li className="nav-item">
          <Link className="nav-link fw-bolder active" to='brands' >Brands</Link>
        </li>:<li className="nav-item">
          <Link className="nav-link fw-bolder" to='brands' >Brands</Link>
        </li>}

        </ul>:null}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-center align-items-center gap-2">

        <li className="nav-item  d-flex align-items-center">
              <i className='mx-2 fa-brands fa-facebook '></i>
            <i className='mx-2 fa-brands fa-youtube '></i>
            <i className='mx-2 fa-brands fa-twitter '></i>
            <i className='mx-2 fa-brands fa-instagram '></i>
              <i className='mx-2 fa-brands fa-tiktok '></i>
        </li>

        

        {userToken?<> 
        <li className='nav-item position-relative'>
          <Link className='nav-link fw-bolder' to='cart'>
            <i className='fa-solid fa-cart-shopping fs-3'></i>
            <div className='badge position-absolute text-white top-0 end-0 bg-main'>{counter}</div>
          </Link>
        </li>
        <li className={`nav-item ng-star-inserted ${style.cursorPointer}`}>
          <a className="nav-link fw-bolder" onClick={logout}>Logout</a>
        </li>
        </>: <>
        {window.location.pathname ==="/register"?<li className="nav-item ng-star-inserted">
          <Link className="nav-link fw-bolder active" to='register'>Register</Link>
        </li>:<li className="nav-item ng-star-inserted">
          <Link className="nav-link fw-bolder" to='register'>Register</Link>
        </li>}
        
        
        {window.location.pathname === "/login"?<li className="nav-item ng-star-inserted">
          <Link className="nav-link fw-bolder active"to="login">Login</Link>
        </li>:<li className="nav-item ng-star-inserted">
          <Link className="nav-link fw-bolder"to="login">Login</Link>
        </li>}
        

        </>   }



      </ul>

    </div>
  </div>
</nav>


  </>
}
