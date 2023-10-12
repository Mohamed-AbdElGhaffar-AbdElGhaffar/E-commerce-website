import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";



export let WishListContext = createContext();

export default function WishListContextProvider({children}){
    let {userToken} = useContext(UserContext);
    const headers ={
        token: userToken
    }
    function addProductToWishList(id) {
        if (headers){
            return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',
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
    }
    function getWishListProduct() {
        console.log("headers",headers);
        if (headers) {
            return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',
            {
                headers
            })
            .then(res=>res)
            .catch(err=>{
                console.log("err",err);
                // console.log(localStorage.getItem("userToken"));
            })
        }
        
    }
    function deleteWishListProduct(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
            headers
        })
        .then(res=>res)
        .catch(err=>err)
    }
    return <WishListContext.Provider value={{addProductToWishList,getWishListProduct,deleteWishListProduct}}>
      {children}
    </WishListContext.Provider>

}