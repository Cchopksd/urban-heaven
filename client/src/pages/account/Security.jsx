import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Switch from 'react-switch';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Security.css';
import BackButton from '../../components/BackButton';
import { resetPassword, updatePassword } from '../../libs/accountSlice';

const Security = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { securityValue } = useSelector((state) => state.account);

	const [onReset, setOnReset] = useState(false);
	const handleChange = (checked) => {
		setOnReset(checked);
	};

	const handleInputForm = (field, value) => {
		dispatch(updatePassword({ [field]: value }));
	};

	const handleReset = async () => {
		if (!securityValue.password || !securityValue.confirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do not empty',
				icon: 'error',
			});
		} else if (securityValue.password !== securityValue.confirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do NOT match!',
				icon: 'error',
			});
		} else {
			dispatch(resetPassword({ securityValue }));
			// window.location.reload();
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
												value={securityValue.password}
												onChange={(e) => {
													handleInputForm(
														'password',
														e.target.value,
													);
												}}
											/>
										</p>
										<p>
											Confirm Password :
											<input
												type='password'
												name='confirm-password'
												id='confirm-password'
												value={
													securityValue.confirmPassword
												}
												onChange={(e) => {
													handleInputForm(
														'confirmPassword',
														e.target.value,
													);
												}}
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
