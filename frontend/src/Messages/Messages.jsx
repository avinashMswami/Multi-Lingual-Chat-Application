import { useEffect, useRef } from "react";
import MessageSkeleton from "../components/Skeletons/MessageSkeleton";
import useGetMessages from "../hooks/useGetMessages"
import Message from "./Message"
import useListenMessages from "../hooks/useListenMessages";


export const Messages = () => {

  const {messages,loading} = useGetMessages();
  // console.log("These are the messages between the users: ",messages);
  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);


  return (

    <div className="px-4 flex flex-col flex-1 overflow-auto py-0">

      {!loading && messages.length > 0 && messages?.map((message)=>{
        {
          // console.log("this is the message being populated:",message);
      }
       return (<div key={message._id} ref={lastMessageRef}><Message  message={message} /> </div>)
      })}

      {loading && [...Array(3)].map((_,idx)=> <MessageSkeleton key={idx} />)}

      {!loading && messages.length ===0 &&(
        <p className="text-center pt-2">Send a Message to Start the Convo!!</p>
      )}
    </div>
  )
}
