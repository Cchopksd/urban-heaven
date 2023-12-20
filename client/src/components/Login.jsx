import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:5500/api/login`, {
                user_email,
                user_password,
            });
            navigate("/chat");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='email'
                    placeholder='Enter email'
                    value={user_email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Enter password'
                    value={user_password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;
