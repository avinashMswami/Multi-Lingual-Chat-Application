// import React from 'react'
// import { useAuthContext } from "../../Context/AuthContext"
import useAuthStore from "../zustand/useAuth.js"
import useConversation from "../zustand/useConversation";
import { extractTime } from "../../../backend/Utils/extractTime";
const Message = ({message}) => {

  const {authUser} = useAuthStore();
  const {selectedConversation} = useConversation()
  // console.log("this is the authuser",authUser);
  // console.log(authUser.userData._id);
  // console.log(message);
  const fromMe = message.senderId === authUser.userData._id;
  const formattedTime = extractTime(message?.createdAt || new Date());
  // console.log("this is the sender's id:",authUser.userData._id);
  // console.log("this is the receiver's id: ",message.senderId);
  const chatClassName = fromMe? 'chat-end' : 'chat-start';
  const profile = fromMe? authUser.userData.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe? 'bg-blue-500' : "";

  // console.log("this is the from me:",fromMe);
  // console.log("this is teh chatClassname:",chatClassName);
  // console.log("this is the profile pic",profile);
  // console.log("this is the bubble color:",bubbleBgColor);
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component"  src={profile} />   
            </div>
        </div>
        
        {fromMe ? (
        <div className={`chat-bubble text-sm mt-3 text-white ${bubbleBgColor}`}>{message.senderMessage}</div>
      ) : (
        <div className={`chat-bubble text-sm mt-3 text-white ${bubbleBgColor}`}>{message.receiverMessage}</div>
      )}
        
<div className='chat-footer opacity-50 text-2 flex gap-1 items-center '>{formattedTime}</div>
    </div>
  )
}

export default Message