import { useEffect, useState } from "react"


const useGetConversation = () => {
  const [loading,setLoading] = useState(false)

  const [conversations,setConversations]=useState(null)

  useEffect(()=>{
    const getConversations = async()=>{
       try {
        const res = await fetch("/api/users");
        // console.log(res);
        const data = await res.json();
        // if (data.error) throw new (data.error)

        setConversations(data);
       } catch (error) {
        // alert(error);
        console.log(error);
       }finally{
        setLoading(false)
       }
    }
    getConversations();
  },[])
  // console.log(conversations);
  return {loading,conversations}
}

export default useGetConversation