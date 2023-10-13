import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";



export let CartContext = createContext();

export default function CartContextProvider({children}){
    let {userToken} = useContext(UserContext);
    let [userId,setUserId]= useState(null)
    const headers ={
        token: userToken
    }
    function addProductToCart(id) {
        // console.log(id);
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            "productId": id
        }
        ,
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    function getCartProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    function clearCartProduct() {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart',
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    function updateProductToCart(id,count) {
        console.log(id);
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            count
        }
        ,
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    function deleteCartProduct(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    function pay(data,id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://e-commerce-website-livid.vercel.app`,
        {
            shippingAddress:data
        },
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    return <CartContext.Provider value={{addProductToCart, getCartProduct,updateProductToCart,deleteCartProduct,clearCartProduct,pay,userId,setUserId}}>
      {children}
    </CartContext.Provider>

}