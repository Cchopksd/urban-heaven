import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { isValid, parse } from "date-fns";
import { IoEyeOffOutline, IoEyeOutline, IoChevronBack } from "react-icons/io5";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/Register.css";
import { Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        step: 1,
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        date: "",
        month: "",
        year: "",
    });
    // console.log(formData.date, formData.month, formData.year);
    // console.log(formData.province);
    const [errors, setErrors] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: "",
        date: "",
        month: "",
        year: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    // eslint-disable-next-line no-unused-vars
    // const [receiveMessage, setReceiveMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? "" : "is required",
        }));
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateData = () => {
        var {
            step,
            name,
            surname,
            username,
            email,
            password,
            confirmPassword,
            phone,
            gender,
            date,
            month,
            year,
        } = formData;

        const inputErrors = {};
        // console.log(step);

        if (step === 1) {
            if (!name) {
                inputErrors.name = "is required";
            }
            if (!surname) {
                inputErrors.surname = "is required";
            }
            if (!username) {
                inputErrors.username = "is required";
            }
            if (!email) {
                inputErrors.email = "is required";
            }
            if (!password) {
                inputErrors.password = "is required";
            }
            if (!confirmPassword) {
                inputErrors.confirmPassword = "is required";
            }
            setErrors(inputErrors);
            // console.log(Object.values(inputErrors));
            if (Object.values(inputErrors).some((error) => error !== "")) {
                return false;
            }
        }
        if (step === 2) {
            if (!phone) {
                inputErrors.phone = "is required";
            }
            if (!gender) {
                inputErrors.gender = "is required";
            }
            if (!date) {
                inputErrors.date = "is required";
            }
            if (!month) {
                inputErrors.date = "is required";
            }
            if (!year) {
                inputErrors.date = "is required";
            }
            setErrors(inputErrors);
            if (Object.values(inputErrors).some((error) => error !== "")) {
                return false;
            }
        }
        return true;
    };

    const nextStep = () => {
        const { email, password, confirmPassword } = formData;
        // eslint-disable-next-line no-useless-escape
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

        if (validateData()) {
            if (!emailRegex.test(email)) {
                // Corrected line
                Swal.fire({
                    title: "Error",
                    text: "Invalid email format",
                    icon: "error",
                });
            } else if (password !== confirmPassword) {
                Swal.fire({
                    title: "Error",
                    text: "Password dose not matched",
                    icon: "error",
                });
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    step: prevData.step + 1,
                }));
            }
        }
    };

    const prevStep = () => {
        setFormData((prevData) => ({
            ...prevData,
            step: prevData.step - 1,
        }));
    };

    const handleSubmit = async (e) => {
        const { phone } = formData;
        e.preventDefault();

        try {
            if (!validateData()) {
                return;
            }

            console.log(!isDateValid());
            if (!isDateValid()) {
                Swal.fire({
                    title: "Message",
                    text: "Invalid Date",
                    icon: "error",
                });
                return;
            }

            const thaiPhoneRegex = /^(\+66|0)-?[1-9]\d{8}$/;
            if (!thaiPhoneRegex.test(phone)) {
                Swal.fire({
                    title: "Error",
                    text: "Invalid phone format (091-234-5678)",
                    icon: "error",
                });
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/register`,
                formData,
                {
                    withCredentials: true,
                },
            );

            await Swal.fire({
                title: "Message",
                text: response.data.message,
                icon: "success",
            });
            navigate('/login')
            setFormData({
                name: "",
                surname: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: "",
                gender: "",
                date: "",
                month: "",
                year: "",
            });
        } catch (err) {
            console.error("Error submitting form:", err);
            await Swal.fire({
                title: "Error",
                text:
                    err.response?.data?.message || "Failed to submit the form",
                icon: "error",
            });
            prevStep();
        }
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: 100 },
        (_, index) => currentYear - index,
    );

    const isDateValid = () => {
        const selectedDate = parse(
            `${formData.year}-${formData.month}-${formData.date}`,
            "yyyy-MM-dd",
            new Date(),
        );
        return isValid(selectedDate);
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
                                        Full name&nbsp;
                                        <span className='regis-err'>
                                            {errors.name || errors.surname}
                                        </span>
                                    </label>
                                    <section className='regis-group-name'>
                                        <input
                                            type='text'
                                            id='name'
                                            name='name'
                                            className='regis-input f-name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder='First name'
                                        />
                                        <input
                                            type='text'
                                            id='surname'
                                            name='surname'
                                            className='regis-input l-name'
                                            value={formData.surname}
                                            onChange={handleChange}
                                            placeholder='Last name'
                                        />
                                    </section>
                                    <section className='regis-group-username'>
                                        <label>
                                            Username&nbsp;
                                            <span className='regis-err'>
                                                {errors.username}
                                            </span>
                                        </label>
                                        <input
                                            type='text'
                                            id='username'
                                            name='username'
                                            className='regis-input'
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder='Enter your username'
                                        />
                                    </section>
                                    <section className='regis-group-email'>
                                        <label htmlFor=''>
                                            Email&nbsp;
                                            <span className='regis-err'>
                                                {errors.email}
                                            </span>
                                        </label>
                                        <input
                                            type='text'
                                            id='email'
                                            name='email'
                                            className='regis-input'
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder='example@email.com'
                                        />
                                    </section>
                                    <section className='regis-group-password'>
                                        <label htmlFor=''>
                                            Create new password&nbsp;
                                            <span className='regis-err'>
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
                                                name='password'
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
                                            Confirm password&nbsp;
                                            <span className='regis-err'>
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
                                                name='confirmPassword'
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
                                <button
                                    className='btn-next-step'
                                    onClick={nextStep}
                                >
                                    Next
                                </button>
                            </section>
                        </section>
                    </section>
                )}

                {formData.step === 2 && (
                    <section className='register-sec-content'>
                        {/* {formData.step} */}
                        <section className='register-form-layout'>
                            <button
                                className='btn-previous-step'
                                onClick={prevStep}
                            >
                                <IoChevronBack /> Previous
                            </button>
                            <h2 className='register-header'>Register Form</h2>
                            <section className='register-form-container-step-2'>
                                <section className='regis-content-step-2'>
                                    <section className='regis-group-tel'>
                                        <label htmlFor='phone'>
                                            Tel.&nbsp;
                                            <span className='regis-err'>
                                                {errors.phone}
                                            </span>
                                        </label>

                                        <input
                                            type='text'
                                            id='phone'
                                            name='phone'
                                            className='regis-input'
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder='Enter your phone number'
                                        />
                                    </section>
                                    <section className='regis-group-gender'>
                                        <label htmlFor='gender'>
                                            Gender&nbsp;
                                            <span className='regis-err'>
                                                {errors.gender}
                                            </span>
                                        </label>
                                        <section className='radio-group-gender'>
                                            <label
                                                htmlFor='male'
                                                className='radio-gender'
                                            >
                                                <input
                                                    type='radio'
                                                    id='male'
                                                    name='gender'
                                                    value='male'
                                                    checked={
                                                        formData.gender ===
                                                        "male"
                                                    }
                                                    onChange={handleChange}
                                                />
                                                male
                                            </label>
                                            <label
                                                htmlFor='female'
                                                className='radio-gender'
                                            >
                                                <input
                                                    type='radio'
                                                    id='female'
                                                    name='gender'
                                                    value='female'
                                                    checked={
                                                        formData.gender ===
                                                        "female"
                                                    }
                                                    onChange={handleChange}
                                                />
                                                female
                                            </label>
                                            <label htmlFor='other'>
                                                <input
                                                    type='radio'
                                                    id='other'
                                                    name='gender'
                                                    value='other'
                                                    checked={
                                                        formData.gender ===
                                                        "other"
                                                    }
                                                    onChange={handleChange}
                                                />
                                                other
                                            </label>
                                        </section>
                                    </section>
                                    <section className='regis-group-date'>
                                        <label htmlFor='date'>
                                            Date of birth&nbsp;
                                            <span className='regis-err'>
                                                {errors.date ||
                                                    errors.month ||
                                                    errors.year}
                                            </span>
                                        </label>
                                        <section className='regis-date-layout'>
                                            <select
                                                name='date'
                                                value={formData.date}
                                                onChange={handleChange}
                                                className='regis-input regis-option-date'
                                            >
                                                <option
                                                    value=''
                                                    disabled
                                                    hidden
                                                >
                                                    Select Day
                                                </option>
                                                {Array.from(
                                                    { length: 31 },
                                                    (_, index) => (
                                                        <option
                                                            key={index + 1}
                                                            value={(index + 1)
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                        >
                                                            {index + 1}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            <select
                                                name='month'
                                                className='regis-input regis-option-date'
                                                value={formData.month}
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value=''
                                                    disabled
                                                    hidden
                                                >
                                                    Select Month
                                                </option>
                                                {Array.from(
                                                    { length: 12 },
                                                    (_, index) => (
                                                        <option
                                                            key={index + 1}
                                                            value={(index + 1)
                                                                .toString()
                                                                .padStart(
                                                                    2,
                                                                    "0",
                                                                )}
                                                        >
                                                            {index + 1}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            <select
                                                name='year'
                                                className='regis-input regis-option-date'
                                                value={formData.year}
                                                onChange={handleChange}
                                            >
                                                <option
                                                    value=''
                                                    disabled
                                                    hidden
                                                >
                                                    Select Year
                                                </option>
                                                {years.map((year) => (
                                                    <option
                                                        key={year}
                                                        value={year.toString()}
                                                    >
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        </section>
                                    </section>
                                </section>
                                <section className='regis-group-checkbox'>
                                    <label htmlFor='agree'>
                                        <input type='checkbox' id='agree' />
                                        Agree to receive newsletter from our
                                    </label>

                                    <label htmlFor='privacy'>
                                        <input
                                            type='checkbox'
                                            id='privacy'
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                        I understand and accept the&nbsp;
                                        <Link>terms of service</Link>.
                                    </label>
                                </section>

                                <button
                                    className={
                                        isChecked ? "btn-next-step" : "disabled"
                                    }
                                    onClick={handleSubmit}
                                    disabled={!isChecked}
                                >
                                    Register
                                </button>
                            </section>
                        </section>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Register;
