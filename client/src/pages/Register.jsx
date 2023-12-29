import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { isValid, parse } from "date-fns";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/Register.css";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {
    const [formData, setFormData] = useState({
        step: 2,
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        tel: "",
        gender: "",
        date: "1",
        month: "1",
        year: "1999",
    });
    // console.log(formData.province);
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
    // eslint-disable-next-line no-unused-vars
    const [receiveMessage, setReceiveMessage] = useState("");
    const [addressData, setAddressData] = useState([]);
    const [amphureData, setAmphureData] = useState([]);
    const [tambonData, setTambonsData] = useState([]);
    // console.log(amphureData);

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
        e.preventDefault();
        if (!isDateValid()) {
            await Swal.fire({
                title: "Message",
                text: "Invalid Date",
                icon: "error",
            });
            return;
        }
        try {
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
        } catch (err) {
            setReceiveMessage(err.response.data.message);
            await Swal.fire({
                title: "Error",
                text: err.response.data.message,
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
            `${formData.month}-${formData.month}-${formData.date}`,
            "yyyy-MM-dd",
            new Date(),
        );
        return isValid(selectedDate);
    };

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(
                    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json",
                );
                setAddressData(response.data);
                setAmphureData(response.data.amphure);
                // console.log(response);
            } catch (error) {
                console.error("Error fetching Address:", error);
            }
        };
        fetchAddress();
    }, []);

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
                                            Username
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
                                            Email
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
                                            Create new password
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
                                            Confirm password
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
                        <section className='register-form-layout'>
                            <h2 className='register-header'>Register Form</h2>
                            <section className='register-form-container'>
                                <section className='regis-content'>
                                    <section className=''>
                                        <label>Tel.</label>

                                        <input
                                            type='text'
                                            id='phone'
                                            className=''
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder='Enter your phone number'
                                        />
                                    </section>
                                    <section className=''>
                                        <label htmlFor=''>Gender</label>
                                        <section>
                                            <label htmlFor='male'>
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
                                            <label htmlFor='female'>
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
                                    <section className='regis-group-password'>
                                        <label htmlFor=''>Date of birth</label>
                                        <select
                                            name='date'
                                            value={formData.date}
                                            onChange={handleChange}
                                        >
                                            {Array.from(
                                                { length: 31 },
                                                (_, index) => (
                                                    <option
                                                        key={index + 1}
                                                        value={(index + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                    >
                                                        {index + 1}
                                                    </option>
                                                ),
                                            )}
                                        </select>

                                        <select
                                            name='month'
                                            value={formData.month}
                                            onChange={handleChange}
                                        >
                                            {Array.from(
                                                { length: 12 },
                                                (_, index) => (
                                                    <option
                                                        key={index + 1}
                                                        value={(index + 1)
                                                            .toString()
                                                            .padStart(2, "0")}
                                                    >
                                                        {index + 1}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        <select
                                            name='year'
                                            value={formData.month}
                                            onChange={handleChange}
                                        >
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

                                    {/* <section>
                                        <label htmlFor=''>Address</label>
                                        <section>
                                            <label>Province</label>
                                            <select
                                                id='provinceDropdown'
                                                name='province'
                                                value={formData.province}
                                                onChange={handleChange}
                                            >
                                                <option value=''>
                                                    กรุณาเลือกจังหวัด
                                                </option>
                                                {addressData.map((province) => (
                                                    <option
                                                        key={province.id}
                                                        value={province.name_th}
                                                    >
                                                        {province.name_th}
                                                    </option>
                                                ))}
                                            </select>
                                        </section>
                                    </section> */}
                                    <section>
                                        <label htmlFor='privacy'>
                                            I understand and accept the
                                            <Link>terms of service</Link>.
                                        </label>
                                    </section>
                                </section>
                                <button
                                    className='btn-next-step'
                                    onClick={prevStep}
                                >
                                    Previous
                                </button>
                                <button
                                    className='btn-next-step'
                                    onClick={handleSubmit}
                                >
                                    Button
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
