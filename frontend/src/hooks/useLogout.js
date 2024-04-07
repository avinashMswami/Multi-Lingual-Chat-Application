// import React from 'react'

import { useState } from "react"
// import { useAuthContext } from "../../Context/AuthContext"
import useAuthStore from "../zustand/useAuth.js"

const useLogout = () => {
  const [loading,setLoading] = useState(false)
  const {setAuthUser}  = useAuthStore();

  const logout = async()=>{
    setLoading(true)
    try {
        const res = await fetch("/api/auth/logout",{
            method:"POST",
            headers:{"Content-Type":"application/json"}
        })
        const data = await res.json()

        console.log(data);

        if (data.error) throw new Error(data.error);

        localStorage.removeItem("chat-user")
        setAuthUser(null);
    } catch (error) {
        // alert(error)
        console.log(error);
    }finally{
        setLoading(false)
    }
  }

  return {loading,logout}
}

export default useLogout