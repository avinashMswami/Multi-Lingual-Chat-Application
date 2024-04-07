// import React from 'react'
import { useState } from "react";
// import { useAuthContext } from "../../Context/AuthContext";
import useAuthStore from "../zustand/useAuth.js"
const useLogin = () => {
  const [loading,setLoading] = useState(false)
  const {setAuthUser} = useAuthStore()

  const login = async({username,password})=>{
    setLoading(true);
    try {
        const res = await fetch("api/auth/login",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userName:username,password})
        })
        const data = await res.json();

        console.log(data);

        
        // if(data.error) throw new Error(data.error)

        localStorage.setItem("chat-user",JSON.stringify(data))
        setAuthUser(data)
    } catch (error) {
        // alert(error)
        console.log(error);
    }
    finally{
        setLoading(false)
    }
  }

  return {loading,login}
}

export default useLogin