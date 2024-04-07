import { useState } from "react"
import useConversation from "./../zustand/useConversation.js"


const useSendMessage = () => {
  const [loading,setLoading] = useState(false);
  const {messages,setMessages,selectedConversation} = useConversation();

  const sendMessage = async(message)=>{
    try {
        setLoading(true)
        console.log(message);
        const res = await fetch(`/api/messages/send/${selectedConversation._id}/${selectedConversation.language}`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({message})
        })
        const {newMessage} = await res.json()
        // console.log(newMessage.senderId,newMessage.receiverId,newMessage.senderMessage,newMessage.receiverMessage);

        const senderId = newMessage.senderId;
        const receiverId=newMessage.receiverId;
        const senderMessage = newMessage.senderMessage;
        const receiverMessage = newMessage.receiverMessage;

        
        if(newMessage.error) throw new Error(newMessage.error)
        
        setMessages([...messages,{senderId,receiverId,senderMessage,receiverMessage}])
    } catch (error) {
        alert(error.message)
    }
    finally{
        setLoading(false)

    }

  }

  return {loading,sendMessage}


}

export default useSendMessage