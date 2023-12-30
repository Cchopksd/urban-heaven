import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import "./styles/Login.css";

const Login = ({ modalIsOpen, closeModal }) => {
    const [user_email, setEmail] = useState("");
    const [user_password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChecked = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        Modal.setAppElement("body");
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/login`,
                {
                    user_email,
                    user_password,
                    isChecked,
                },
                {
                    withCredentials: true,
                },
            );
            // navigate("/");
            await Swal.fire({
                title: "Message",
                text: response.data.message,
                icon: "success",
            });
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Login failed:", error.response.data.message);
            await Swal.fire({
                title: "System",
                text: error.response.data.message,
                icon: "error",
            });
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
                <section className='form-login'>
                    <section className='login-input-sec'>
                        <label className='form-label'>
                            <b>Email</b>
                        </label>
                        <input
                            className='login-input'
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
                        <section className='frame-login-input-password'>
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                className={`login-input ${
                                    user_password && "has-value"
                                }`}
                                placeholder='Enter your password'
                                value={user_password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className='btn-eye-login'
                                onClick={togglePassword}
                            >
                                {showPassword ? (
                                    <IoEyeOutline />
                                ) : (
                                    <IoEyeOffOutline />
                                )}
                            </button>
                        </section>
                    </section>
                </section>
                <section className='login-ops-sec'>
                    <label className='check-remember'>
                        <input
                            checked={isChecked}
                            onChange={handleChecked}
                            type='checkbox'
                        />
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
