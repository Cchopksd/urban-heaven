import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { loginUser } from '../libs/auth/authSlice';
import './styles/Login.css';

const Login = ({ modalIsOpen, closeModal }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { status } = useSelector((state) => state.auth);
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const params = sessionStorage.getItem('PAGE_URI');

	useEffect(() => {
		if (modalIsOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleChecked = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		Modal.setAppElement('body');
	}, []);

	const handleLogin = async () => {
		if (status !== 'loading') {
			await dispatch(loginUser({ password, email, closeModal, isChecked }));
			if (params === '/register') {
				navigate('/');
			}
			navigate('/email-verify');
		}
	};

	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			className='Modal first-two'
			overlayClassName='Overlay'>
			<button
				className='btn-close-modal'
				onClick={closeModal}>
				&times;
			</button>
			<h2 className='login-modal-header'>{t('Login')}</h2>
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</section>

					<section className='login-input-sec'>
						<label className='form-label'>
							<b>{t('password')}</b>
						</label>
						<section className='frame-login-input-password'>
							<input
								type={showPassword ? 'text' : 'password'}
								name='password'
								className={`login-input ${
									password && 'has-value'
								}`}
								placeholder='Enter your password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								className='btn-eye-login'
								onClick={togglePassword}>
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
						to={'/register'}
						onClick={closeModal}
						className='modal-link-to-regis'>
						<button className='modal-btn-regis'>Register</button>
					</Link>
					<button
						className='modal-btn-login'
						onClick={handleLogin}>
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
