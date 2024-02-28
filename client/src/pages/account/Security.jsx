import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Switch from 'react-switch';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Security.css';
import BackButton from '../../components/BackButton';
import {
	resetPassword,
	setInputPassword,
	setInputConfirmPassword,
	selectInputConfirmPassword,
	selectInputPassword,
} from '../../libs/accountSlice';

const Security = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const inputPassword = useSelector(selectInputPassword);
	const inputConfirmPassword = useSelector(selectInputConfirmPassword);
	console.log(inputConfirmPassword);

	const [onReset, setOnReset] = useState(false);
	const handleChange = (checked) => {
		setOnReset(checked);
	};

	const handleConfirmPasswordChange = (e) => {
		dispatch(setInputConfirmPassword(e.target.value));
	};

	const handleReset = async () => {
		if (!inputPassword || !inputConfirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do not empty',
				icon: 'error',
			});
		} else if (inputPassword !== inputConfirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do NOT match!',
				icon: 'error',
			});
		} else {
			dispatch(resetPassword({ inputPassword }));
			await Swal.fire({
				title: 'Success',
				text: 'Password has changed',
				icon: 'success',
			});
			window.location.reload();
		}
	};

	useEffect(() => {
		document.title = t('security');
		sessionStorage.setItem('PAGE_URI', '/account/security');
	});

	return (
		<div className='security-screen'>
			<Navbar />
			<main className='security-container'>
				<section className='security-sec-content'>
					<section className='security-sec-header-layout'>
						<section className='security-sec-header'>
							<BackButton />
							<h1 className='security-head'>{t('security')}</h1>
						</section>
						<hr className='security-head-line' />
						<section>
							<section>
								<section>
									<h1 className='secure-head-reset-pass'>
										Reset Password
									</h1>
									<Switch
										onChange={handleChange}
										checked={onReset}
										uncheckedIcon={false}
										checkedIcon={false}
									/>
								</section>
								{onReset ? (
									<section>
										<p>
											Password :
											<input
												type='password'
												id='password'
												name='password'
												value='password'
												onChange={(e) => {
													setInputPassword(
														e.target.value,
													);
												}}
											/>
										</p>
										{/* <p>Input Data: {inputPassword}</p> */}
										<p>
											Confirm Password :
											<input
												type='text'
												name='password'
												id='confirm-password'
												value={inputConfirmPassword}
												onChange={
													handleConfirmPasswordChange
												}
											/>
										</p>
										<button
											type='submit'
											onClick={handleReset}>
											Reset Password
										</button>
									</section>
								) : (
									false
								)}
							</section>
							<section></section>
						</section>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Security;
