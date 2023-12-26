import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./styles/Login.css";
import PropTypes from "prop-types";

const Login = ({ modalIsOpen, closeModal }) => {
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Set the app element when the component mounts
        Modal.setAppElement("body");
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(
                `http://localhost:5500/api/login`,
                {
                    user_email,
                    user_password,
                },
                {
                    withCredentials: true,
                },
            );
            navigate("/");
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className='Modal first-two'
            overlayClassName='Overlay'
        >
            <button className='btn-close-modal' onClick={closeModal}>
                &times;
            </button>
            <h2 className='login-modal-header'>Log in</h2>
            <main className='login-container'>
                <form className='form-login'>
                    <section className='login-input-sec'>
                        <label className='form-label'>
                            <b>Email</b>
                        </label>
                        <input
                            type='text'
                            name='email'
                            placeholder='Enter your email'
                            value={user_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                    <section className='login-input-sec'>
                        <label className='form-label'>
                            <b>Password</b>
                        </label>
                        <input
                            type='password'
                            name='password'
                            className={`form-input ${
                                user_password && "has-value"
                            }`}
                            placeholder='Enter your password'
                            value={user_password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>
                </form>
                <section className='login-ops-sec'>
                    <label className='check-remember'>
                        <input type='checkbox' />
                        <span className='text-remember'>Remember me</span>
                    </label>
                    <Link className='btn-forgot'>Forgot password?</Link>
                </section>
                <section className='login-regis-ops-sec'>
                    <Link
                        to={"/register"}
                        onClick={closeModal}
                        className='modal-link-to-regis'
                    >
                        <button className='modal-btn-regis'>Register</button>
                    </Link>
                    <button className='modal-btn-login' onClick={handleSubmit}>
                        Login
                    </button>
                </section>
            </main>
        </Modal>
    );
};

export default Login;

Login.propTypes = {
    modalIsOpen: PropTypes.bool,
    closeModal: PropTypes.func,
};

