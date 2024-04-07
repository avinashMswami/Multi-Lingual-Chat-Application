import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";
import useConversation  from "../zustand/useConversation.js"
import useGetConversations from "../hooks/useGetConversation.js"

export const SearchInput = () => {

 const [search,setSearch]= useState("");
//  const {setSelelctedConversation}= useConversation();
const {setSelectedConversation} = useConversation()
 const {conversations}= useGetConversations()

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!search) return;
  if (search.length < 3) {
    return alert("Search term must be at least 3 characters long");
  }

  const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

  if (conversation) {
    setSelectedConversation(conversation);
    setSearch("");
  } else alert("No such user found!");
};
  return (
    <div>
        <form className='w-full flex items-center gap-2' onSubmit={handleSubmit}>
<input type='text' placeholder='Search...' className='input input-bordered rounded-full'
value={search}
onChange={(e)=>setSearch(e.target.value)} />
<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
<MdPersonSearch className=" size-6 text-center "/>
</button>
</form>
    </div>
  )
}
