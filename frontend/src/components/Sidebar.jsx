// import React from 'react'

import { Conversations } from "./Conversations"
import { SearchInput } from "./SearchInput"
import { RiLogoutBoxLine } from "react-icons/ri";
// import { useAuthContext } from "../../Context/AuthContext";
import useLogout from "../hooks/useLogout";

export const Sidebar = () => {
  const {logout} = useLogout();
  return (
    <div className="w-1/3 border-r border-slate-500 h-screen overflow-auto">
       <SearchInput />
<div className='divider py-0 px-3'></div>
 <Conversations />
{/*<LogoutButton /> */}
<RiLogoutBoxLine className="size-6  cursor-pointer mt-auto" onClick={logout}/>
    </div>
  )
}
