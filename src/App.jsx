import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Cart from './components/Cart/Cart';
import UserContextProvider from './Contexts/UserContext';
import Gurad from './components/Gurad/Gurad';
import CartContextProvider from './Contexts/CartContext';
import CounterContextProvider from './Contexts/CounterContext';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './Contexts/WishListContext';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';


let routers=createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<Gurad> <Home/> </Gurad> },
    {path:'products',element:<Gurad><Products/></Gurad>},
    {path:'Product/:id',element:<Gurad><ProductDetails/></Gurad>},
    {path:'brands',element:<Gurad><Brands/></Gurad>},
    {path:'categories',element:<Gurad><Categories/></Gurad>},
    {path:'cart',element:<Gurad><Cart/></Gurad>},
    {path:'wishList',element:<Gurad><WishList/></Gurad>},
    {path:'check-out/:id',element:<Gurad><CheckOut/></Gurad>},
    {path:'allorders',element:<Gurad><AllOrders/></Gurad>},
    {path:'login',element:<Login/>},
    {path:'forget-password',element:<ForgetPassword/>},
    {path:'verify-code',element:<VerifyCode/>},
    {path:'reset-password',element:<ResetPassword/>},
    {path:'register',element:<Register/>},
    {path:'*',element:<NotFound/>},
  ]}
])

function App() {
  return <>

   <UserContextProvider>
    <CounterContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
          <RouterProvider router={routers} ></RouterProvider>
        </WishListContextProvider>
      </CartContextProvider>
    </CounterContextProvider>
    </UserContextProvider>
  </>
}

export default App;
