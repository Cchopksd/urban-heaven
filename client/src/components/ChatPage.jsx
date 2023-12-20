import io from "socket.io-client";
import axios from "axios";
var socket = io.connect("http://localhost:5500");
import { useEffect, useState } from "react";

// Emitting a message to the server

function ChatPage() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", { message });
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });

        return () => {
            socket.off("receive_message");
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post(`http://localhost:5500/api/logout`);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <input
                placeholder='Message...'
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}>Send message</button>
            <h1>Message :</h1>
            {messageReceived}
        </div>
    );
}

export default ChatPage;
