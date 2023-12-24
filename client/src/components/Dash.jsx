import Navbar from "./Navbar";
import { useContext } from "react";
import axios from "axios";
import { Context } from "../context/Provider";
import { useNavigate } from "react-router-dom";

const Dash = () => {
    const navigate = useNavigate();
    const { data } = useContext(Context);
    const handleLogout = async () => {
        try {
            await axios.post(`http://localhost:5500/api/logout`, null, {
                withCredentials: true,
            });
            window.location.reload();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
        <div>
            <Navbar />
            <button onClick={handleLogout}>Logout</button>
            <p>Dashboard</p>
            <p>{`data: ${data.user}`}</p>
            <p></p>
        </div>
    );
};

export default Dash;
