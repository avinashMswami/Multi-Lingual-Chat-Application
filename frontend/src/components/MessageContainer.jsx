import { useEffect } from "react";
import { Messages } from "../Messages/Messages";
import useConversation from "../zustand/useConversation.js";
import MessageInput from "./MessageInput";
// import NoChatSelected from "./NoChatSelected"; // Import the NoChatSelected component
import {TiMessages} from "react-icons/ti"
export const MessageContainer = () => {
  // const noChatSelected = true; 
  // Set the value based on your condition

  const {selectedConversation,setSelectedConversation} = useConversation()

  useEffect(()=>{
    //Cleaner Function
    return ()=> setSelectedConversation(null);
  },[setSelectedConversation])
  
  return (
    <div className="overflow-auto w-2/3">
      {/* Conditionally render NoChatSelected or MessageContainer content */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="h-10 bg-slate-500 pl-5 py-2 mb-2 rounded-sm w-full">
          <div>
            <span className="label-text">To: </span>
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>
          <Messages />
          <div className="fixed bottom-0 w-2/3 pr-[5rem]">
          <MessageInput />
          </div>
          

        </div>
      )}
    </div>
  );
};

const NoChatSelected = () => {


  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
}

