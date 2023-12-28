import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/Register.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
    const [formData, setFormData] = useState({
        step: 1,
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateData = () => {
        const {
            step,
            name,
            surname,
            username,
            email,
            password,
            confirmPassword,
        } = formData;

        const inputErrors = {};

        if (step === 1) {
            if (name === "" ) {
                inputErrors.name = "is required";
            }
            if (surname === "") {
                inputErrors.surname = "is required";
            }
                if (username === "") {
                    inputErrors.username = "is required";
                }
            if (email === "") {
                inputErrors.email = "is required";
            }
            if (password === "") {
                inputErrors.password = "is required";
            }
            if (confirmPassword === "") {
                inputErrors.confirmPassword = "is required";
            }

            setErrors(inputErrors);

            if (Object.values(inputErrors).some((error) => error !== "")) {
                // console.log("กรุณากรอกข้อมูลใน Step 1 ให้ครบถ้วน");
                return false;
            }
        }

        return true;
    };

    const nextStep = () => {
        if (validateData()) {
            setFormData((prevData) => ({
                ...prevData,
                step: prevData.step + 1,
            }));
        }
    };
    const prevStep = () => {
        setFormData((prevData) => ({
            ...prevData,
            step: prevData.step - 1,
        }));
    };
    return (
        <div className='register-screen'>
            <Navbar />
            <main className='register-layout'>
                {formData.step === 1 && (
                    <section className='register-sec-content'>
                        <section className='register-form-layout'>
                            <h2 className='register-header'>Register Form</h2>
                            <section className='register-form-container'>
                                <section className='regis-content'>
                                    <label>
                                        Full name
                                        <span className="regis-err">
                                            {errors.name || errors.surname}
                                        </span>
                                    </label>

                                    <section className='regis-group-name'>
                                        <input
                                            type='text'
                                            id='name'
                                            className='regis-input f-name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='First name'
                                        />
                                        <input
                                            type='text'
                                            id='surname'
                                            className='regis-input l-name'
                                            value={formData.surname}
                                            onChange={handleChange}
                                            placeholder='Last name'
                                        />
                                    </section>
                                    <section className='regis-group-username'>
                                        <label>
                                            Username
                                            <span className="regis-err">
                                                {errors.username}
                                            </span>
                                        </label>
                                        <input
                                            type='text'
                                            id='username'
                                            className='regis-input'
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder='Enter your username'
                                        />
                                    </section>
                                    <section className='regis-group-email'>
                                        <label htmlFor=''>
                                            Email
                                            <span className="regis-err">
                                                {errors.email}
                                            </span>
                                        </label>
                                        <input
                                            type='text'
                                            id='email'
                                            className='regis-input'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='Enter your email'
                                        />
                                    </section>
                                    <section className='regis-group-password'>
                                        <label htmlFor=''>
                                            Create new password
                                            <span className="regis-err">
                                                {errors.password}
                                            </span>
                                        </label>
                                        <section className='regis-group-pass-content'>
                                            <input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id='password'
                                                className='regis-input'
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder='Enter your password'
                                            />
                                            <button
                                                className='btn-eye'
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
                                    <section className='regis-group-confirm-password'>
                                        <label htmlFor=''>
                                            Confirm password
                                            <span className="regis-err">
                                                {errors.confirmPassword}
                                            </span>
                                        </label>
                                        <section className='regis-group-pass-content'>
                                            <input
                                                type={
                                                    showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id='confirmPassword'
                                                className='regis-input'
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                placeholder='Enter your password again'
                                            />
                                            <button
                                                className='btn-eye'
                                                onClick={toggleConfirmPassword}
                                            >
                                                {showConfirmPassword ? (
                                                    <IoEyeOutline />
                                                ) : (
                                                    <IoEyeOffOutline />
                                                )}
                                            </button>
                                        </section>
                                    </section>
                                </section>
                                <button className="btn-next-step" onClick={nextStep}>Next</button>
                            </section>
                        </section>
                    </section>
                )}
                {formData.step === 2 && (
                    <section className='register-sec-content'>
                        <section className='register-form'>
                            <h2>Register Form</h2>
                            <section>
                                <label>Your name</label>
                                <section>
                                    <input
                                        type='text'
                                        placeholder='First name'
                                    />
                                    <input
                                        type='text'
                                        placeholder='Last name'
                                    />
                                </section>
                            </section>
                            <section>
                                <label>Username</label>
                                <section>
                                    <input
                                        type='text'
                                        placeholder='Enter your username'
                                    />
                                </section>
                            </section>
                            <section>
                                <label htmlFor=''>Email</label>
                                <section>
                                    <input
                                        type='text'
                                        placeholder='Enter your email'
                                    />
                                </section>
                            </section>
                            <section>
                                <label htmlFor=''>Create new password</label>
                                <section>
                                    <input type='password' />
                                </section>
                            </section>
                            <section>
                                <label htmlFor=''>Confirm password</label>
                                <section>
                                    <input type='password' />
                                </section>
                            </section>
                        </section>
                        <button onClick={prevStep}>Previous</button>
                        <button>Submit</button>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Register;
