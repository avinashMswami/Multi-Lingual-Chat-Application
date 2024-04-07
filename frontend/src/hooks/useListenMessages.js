import { useEffect } from "react";
import { useSocketContext } from "../../Context/socketContext"
import useConversation from "../zustand/useConversation.js"

const useListenMessages = () => {
  const {socket} = useSocketContext()
  const {messages,setMessages} = useConversation();

  useEffect(()=>{
    socket?.on("newMessage",({newMessage})=>{
        const senderId = newMessage.senderId;
        const receiverId=newMessage.receiverId;
        const senderMessage = newMessage.senderMessage;
        const receiverMessage = newMessage.receiverMessage;

        setMessages([...messages,{senderId,receiverId,senderMessage,receiverMessage}])
    })

    return ()=> socket.off("newMessage")
  },[socket,setMessages,messages])


}

export default useListenMessages