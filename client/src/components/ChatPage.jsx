import io from "socket.io-client";
var socket = io.connect("http://localhost:5500");
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", { message });
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageReceived(...messageReceived, data.message);
            console.log(...messageReceived);
        };

        socket.on("receive_message", handleReceiveMessage);

        return async () => {
            await socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    const handleLogout = async () => {
        // try {
        //     await axios.post(`http://localhost:5500/api/logout`);
        // } catch (error) {
        //     console.error("Logout error:", error);
        // }
        localStorage.removeItem("token");
        navigate("/");
    };
    // console.log("User Data from localStorage:", token);

    return (
        <div>
            <Navbar />

            <button onClick={handleLogout}>Logout</button>
            <input
                placeholder='Message...'
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}>Send message</button>
            <h1>Message :</h1>
            <p>{messageReceived}</p>
        </div>
    );
};

export default ChatPage;
