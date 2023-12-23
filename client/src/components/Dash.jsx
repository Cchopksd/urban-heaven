import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Dash = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5500/dashboard",
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                            // และ headers อื่น ๆ ที่อาจจะต้องการ
                        },
                    }
                );
                setData(response.data);
            } catch (error) {
                error;
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <p>Dashboard</p>
            <p>{`data: ${data}`}</p>
        </div>
    );
};

export default Dash;
