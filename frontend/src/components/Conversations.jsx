import useGetConversation from "../hooks/useGetConversation";
import { Conversation } from "./Conversation";


export const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  
  // console.log(conversations);

  return (
    <div className="flex flex-col overflow-auto py-0">
      {conversations?.map((conversation) => ( // Added parentheses and return statement
        <Conversation 
          key={conversation._id}
          conversation={conversation}
        />
      ))}
      
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};



// STARTER CODE SNIPPET
// import { Conversation } from "./Conversation"


// export const Conversations = () => {
//   return (
//     <div className="flex flex-col overflow-auto py-0"><Conversation/>
//     <Conversation/>
//     <Conversation/>
//     <Conversation/>
//     <Conversation/></div>
//   )
// }
