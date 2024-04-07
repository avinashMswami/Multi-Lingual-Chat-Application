import { useSocketContext } from "../../Context/socketContext.jsx";
import useConversation from "../zustand/useConversation.js"


export const Conversation = ({conversation}) => {
  // console.log(conversation);
  const {selectedConversation,setSelectedConversation} = useConversation();

  const isSelected = selectedConversation?._id===conversation._id;


  // if(selectedConversation) console.log("The selected Conversation is this:",selectedConversation);


  const {onlineUsers} = useSocketContext();
  // console.log("This is the onlineusers received from the contest: ",onlineUsers);
  // console.log(conversation._id);
  const isOnline = onlineUsers.includes(conversation._id);
  return (
    <>
    <div className={`flex gap-4  items-center  hover:bg-sky-500 rounded p-1.5 py-1 cursor-pointer
    ${isSelected? "bg-sky-500" : ""}
    `}
    onClick={()=>setSelectedConversation(conversation)}
    
    >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
         
         {/* <div className={`avatar online`}> */}
            <div className="w-12 rounded-full">
            <img
                    src={conversation.profilePic} alt='user avatar'/>           
                     </div>
        </div>
    
        <div className="flex flex-col flex-1">
        <p className="font-bold text-white">{conversation.fullName}</p>
        </div>

    
    

    </div>
    <div className="divider py-0 my-1 h-1" /></>
  )
}


// STARTER CODE SNIPPET

// export const Conversation = () => {
//     return (
//       <>
//       <div className="flex gap-4  items-center  hover:bg-sky-500 rounded p-1.5 py-1 cursor-pointer">
//           <div className="avatar online">
//               <div className="w-12 rounded-full">
//               <img
//                       src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png' alt='user avatar'/>           
//                        </div>
//           </div>
      
//           <div className="flex flex-col flex-1">
//           <p className="font-bold text-white">Nash</p>
//           </div>
  
      
      
  
//       </div>
//       <div className="divider py-0 my-1 h-1" /></>
//     )
//   }
  
