import { createContext, useState } from "react";


export let UserContext = createContext();

export default function UserContextProvider({children}){

    let [userToken,setUserToken]=useState(localStorage.getItem('userToken'));
    return <UserContext.Provider value={{userToken,setUserToken}}>
      {children}
    </UserContext.Provider>

}