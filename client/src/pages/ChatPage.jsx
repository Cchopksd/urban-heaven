import io from "socket.io-client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const socket = io.connect(`${import.meta.env.VITE_SOCKET_URL}`);

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
            <Footer />
        </div>
    );
};

export default ChatPage;
