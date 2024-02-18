import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import Switch from 'react-switch';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Security.css';
import BackButton from '../../components/BackButton';
import { resetPassword } from '../../libs/accountSlice';

const Security = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [onReset, setOnReset] = useState(false);
	const [password, setPassword] = useState(null);
	const [confirmPassword, setConfirmPassword] = useState(null);
	const handleChange = (checked) => {
		setOnReset(checked);
	};

	const handleReset = async() => {
		if (!password || !confirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do not empty',
				icon: 'error',
			});
		} else if (password !== confirmPassword) {
			Swal.fire({
				title: 'Error',
				text: 'Password do NOT match!',
				icon: 'error',
			});
		} else {
			dispatch(resetPassword({ password }));
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
							<div className='hide-element'>
								<BackButton />
							</div>
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
												onChange={(e) => {
													setPassword(e.target.value);
												}}
											/>
										</p>
										<p>
											Confirm Password :
											<input
												type='password'
												name='password'
												id='confirm-password'
												onChange={(e) => {
													setConfirmPassword(
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
