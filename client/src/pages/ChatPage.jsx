import io from 'socket.io-client';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// const socket = io.connect(`http://localhost:5500`);

const ChatPage = () => {
	// const [message, setMessage] = useState("");
	// const [messageReceived, setMessageReceived] = useState("");
	// const sendMessage = () => {
	//     socket.emit("send_message", { message });
	// };

	// useEffect(() => {
	//     const handleReceiveMessage = (data) => {
	//         setMessageReceived(...messageReceived, data.message);
	//         console.log(...messageReceived);
	//     };

	//     socket.on("receive_message", handleReceiveMessage);

	//     return async () => {
	//         await socket.off("receive_message", handleReceiveMessage);
	//     };
	//     // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [socket]);

	return (
		<div>
			<Navbar />

			{/* <input
                placeholder='Message...'
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}>Send message</button>
            <h1>Message :</h1>
            <p>{messageReceived}</p> */}
			<Footer />
			<Outlet />
		</div>
	);
};

export default ChatPage;
