import { createContext, useEffect, useState,useContext } from "react";
// import { useAuthContext } from "./AuthContext.jsx";
import useAuthStore from "../src/zustand/useAuth.js";
import io from "socket.io-client";


const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const { authUser } = useAuthStore();
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (authUser) {
            // console.log("this is the authuser checker from the frontend: ",authUser);
            const socket = io("http://localhost:8000",{
            query:
                {
                    userId: authUser.userData._id
                }});
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                    // console.log("this is the socket id",socket.id);
                setOnlineUsers(users)
                // console.log("this is");
                // console.log("these are the users from the setOnlineUsers: ",users);
            })

            return () => {
                socket.close();
            };
        } else {
            // If there's no authenticated user, close the socket connection
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
