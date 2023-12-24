import io from "socket.io-client";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const socket = io.connect("http://localhost:5500");

const ChatPage = () => {
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

    return (
        <div>
            <Navbar />

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
