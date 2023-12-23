import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";

const Dash = () => {
    const [data, setData] = useState([]);
    // console.log(data)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5500/api/dashboard",
                    {
                        withCredentials: true,
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
            <p>{`data: ${data.user}`}</p>
            <p></p>
        </div>
    );
};

export default Dash;
