import { getReceiverSocketId, io } from "../Sockets/socket.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.mode.js";
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';
// import User from "../models/user.model.js";
export const sendMessage = async(req,res)=>{
    // console.log("Hi from the sendMessage");
    const {message} = req.body;
    const {id:receiverId,language:receiverLanguageCode} = req.params;
    const {_id:senderId} = req.user;
    const {language:sourceLanguageCode} = req.user;
    // console.log("This is the senderId that I got: ",senderId);
    // console.log("this is the message from fe:",message);
    // console.log("this is the receiverid from fe:",receiverId);
    // console.log("this is the senderid from fe:",senderId);
    // console.log("this is the receiverlanguage from fe:",receiverLanguageCode);
    // console.log("this is the sender language from fe:",sourceLanguageCode);


    
    try {
      let conversation = await  Conversation.findOne({
        participants:{$all: [senderId,receiverId] }
      });
      if (!conversation){
        conversation = await Conversation.create({participants:[senderId,receiverId]});
      }

      // Translation Happens here!
//-----------------------------------------------------------------------------------------------------------------
const config = {
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
  region: 'ap-south-1',
};

const client = new TranslateClient(config);
const input = {
  Text:message, 
  SourceLanguageCode: sourceLanguageCode, // Source language code (required)
  TargetLanguageCode: receiverLanguageCode, // Target language code (required)
//   TerminologyNames: ['STRING_VALUE'], // Optional: array of terminology names
  Settings: {
    Formality: "INFORMAL",  // Optional: formality setting
    Profanity: "MASK",  // Optional: profanity setting
    Brevity: "ON",  // Optional: brevity setting
  },
};
const command = new TranslateTextCommand(input);
const response = await client.send(command);


//-----------------------------------------------------------------------------------------------------------------

      const newMessage = new Message({
        senderId,
        receiverId,
        senderMessage: message,
        receiverMessage:response.TranslatedText
      })
      // await newMessage.save();
      // console.log("This is the id of the newMessage that is created: ", newMessage._id);

      // if (newMessage){
        conversation.messages.push(newMessage._id)
      // } 
      // await conversation.save();

      await Promise.all([conversation.save(),newMessage.save()]);

      // SOCKET FUNCTIONALITTY 
      
      const receiverSocketId = getReceiverSocketId(receiverId);

      if(receiverSocketId) {
        // io.to(<socketId>).emit() is used to send events to specific clients

        io.to(receiverSocketId).emit("newMessage",{newMessage});
      }

      res.status(201).json({newMessage});
    } catch (error) {
        console.log("Error in sendMessage Controller: ",error);
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessage = async(req,res)=>{
    try {
      const {id:userToChat} = req.params;
      const {_id:senderId} = req.user;
      
      const conversation = await Conversation.findOne({
        participants:{$all: [senderId,userToChat]}}).populate("messages");
        // The actual messages array in the Conversation collection contains the message ids and 
        // not the exact messaage. So this populate function returns the entire message document/data
        // in place of the message id.
        // console.log(conversation);

        if(!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessage Controller: ",error);
        res.status.json({message:"Internal server error"})
    }

}

