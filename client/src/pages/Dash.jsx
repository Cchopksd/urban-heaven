import Navbar from "../components/Navbar";
import { useContext } from "react";
import { Context } from "../context/ProviderCenter";

const Dash = () => {
    const { data } = useContext(Context);
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
