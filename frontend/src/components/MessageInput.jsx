import { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Avoid sending empty messages
        sendMessage(message);
        setMessage(''); // Clear input after sending message
    };

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full flex-grow p-2.5 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    key="message-input"
                />
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3' aria-label="Send">
                    {loading ? <div className="loading loading-spinner"></div> : <BiSend className="size-6" />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
