import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const Context = createContext();

// console.log(Context)

const Provider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState("");
    const { username } = data;
    // console.log(username);
    const fetchData = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5500/api/dashboard",
                {
                    withCredentials: true,
                },
            );
            setData(response.data);
            setLoading(false);
        } catch (e) {
            console.log(e.response.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Context.Provider value={{ username, loading, data, fetchData }}>
            {children}
        </Context.Provider>
    );
};

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { Context, Provider };
