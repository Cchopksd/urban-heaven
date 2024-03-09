import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { isValid, parse } from 'date-fns';
import Swal from 'sweetalert2';

import { getRefreshToken } from '../../libs/auth/authSlice';
import {
	editAccountDetails,
	getUserData,
	updateProfile,
} from '../../libs/accountSlice';
// import { getRefreshToken } from '../../libs/auth/authSlice';

import ImageProfile from '../../components/imageUpload/imageProfile';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Profile.css';

import BackButton from '../../components/BackButton';

const Profile = () => {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('profile');
		sessionStorage.setItem('PAGE_URI', '/account/edit-profile');
		dispatch(getUserData());
	}, [t, dispatch]);

	const { status, updateProfileValue } = useSelector(
		(state) => state.account,
	);

	useEffect(() => {
		const refreshTimeout = setTimeout(() => {
			dispatch(getRefreshToken());
		}, 30 * 60 * 1000);
		return () => clearTimeout(refreshTimeout);
	});

	const handleInputForm = (field, value) => {
		dispatch(updateProfile({ [field]: value }));
	};

	const submitForm = async (e) => {
		e.preventDefault();
		console.log(updateProfileValue.avatar_image);
		try {
			const nameRegex = /^[a-zA-Z]+$/;
			const thaiPhoneRegex = /(08|09|06)\d{8}/;
			if (!thaiPhoneRegex.test(updateProfileValue.phone)) {
				Swal.fire({
					title: 'Error',
					text: 'Invalid phone format (0912345678)',
					icon: 'error',
				});
				return;
			}
			if (
				!nameRegex.test(
					updateProfileValue.first_name ||
						updateProfileValue.last_name,
				)
			) {
				Swal.fire({
					title: 'Error',
					text: 'Invalid name or surname format',
					icon: 'error',
				});
				return;
			}
			if (!isDateValid()) {
				Swal.fire({
					title: 'Error',
					text: 'Invalid Date',
					icon: 'error',
				});
				console.log('not ok');
				return;
			}
			console.log('ok');
			dispatch(editAccountDetails({ updateProfileValue }));
		} catch (err) {
			throw new err();
		}
	};

	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: 100 },
		(_, index) => currentYear - index,
	);

	const isDateValid = () => {
		const { year, month, date } = updateProfileValue;

		const selectedDate = parse(
			`${updateProfileValue.year}-${updateProfileValue.month}-${updateProfileValue.date}`,
			'yyyy-MM-dd',
			new Date(),
		);
		return isValid(selectedDate);
	};

	return (
		<section className='profile-screen'>
			<Navbar />
			<main className='profile-layout'>
				<section className='profile-content'>
					<section className='profile-sec-header'>
						<BackButton />
						<h1 className='profile-head'>{t('profile')}</h1>
					</section>
					<hr className='profile-head-line' />

					{status === 'loading' ? (
						<section className='loader'>
							<TailSpin
								visible={true}
								height='20'
								width='20'
								color='#000000'
								ariaLabel='tail-spin-loading'
								radius='1'
								wrapperStyle={{}}
								wrapperClass=''
							/>
						</section>
					) : (
						<section className='edit-profile-sec-layout'>
							<section className='edit-profile-sec'>
								<section className='edit-profile-sec-content-left'>
									<ImageProfile />
								</section>
								<section className='edit-profile-sec-layout-right'>
									<section className='edit-profile-sec-content-right'>
										<section className='edit-profile-g-name'>
											<label htmlFor='Full Name'>
												Full Name :
											</label>
											<section className='edit-profile-name'>
												<input
													className='edit-profile-input'
													name='FirstName'
													id='first-name'
													type='text'
													value={
														updateProfileValue.first_name
													}
													onChange={(e) =>
														handleInputForm(
															'first_name',
															e.target.value,
														)
													}
												/>
												<input
													className='edit-profile-input'
													name='lastName'
													id='lastName'
													type='text'
													value={
														updateProfileValue.last_name
													}
													onChange={(e) =>
														handleInputForm(
															'last_name',
															e.target.value,
														)
													}
												/>
											</section>
										</section>
										<section className='edit-profile-g-phone'>
											<label htmlFor='phone'>
												Phone :
											</label>
											<section>
												<input
													className='edit-profile-input'
													name='phone'
													id='phone'
													type='text'
													value={
														updateProfileValue.phone
													}
													maxLength={10}
													onChange={(e) =>
														handleInputForm(
															'phone',
															e.target.value,
														)
													}
												/>
											</section>
										</section>
										<section className='edit-profile-g-gender'>
											<label htmlFor='gender'>
												Gender :
											</label>
											<section className='edit-profile-gender'>
												<label
													htmlFor='male'
													className=''>
													<input
														type='radio'
														id='male'
														name='gender'
														value={'male'}
														checked={
															updateProfileValue.gender ===
															'male'
														}
														onChange={(e) =>
															handleInputForm(
																'gender',
																e.target.value,
															)
														}
													/>
													male
												</label>
												<label
													htmlFor='female'
													className=''>
													<input
														type='radio'
														id='female'
														name='gender'
														value={'female'}
														checked={
															updateProfileValue.gender ===
															'female'
														}
														onChange={(e) =>
															handleInputForm(
																'gender',
																e.target.value,
															)
														}
													/>
													female
												</label>
												<label htmlFor='other'>
													<input
														type='radio'
														id='other'
														name='gender'
														value={'other'}
														checked={
															updateProfileValue.gender ===
															'other'
														}
														onChange={(e) =>
															handleInputForm(
																'gender',
																e.target.value,
															)
														}
													/>
													other
												</label>
											</section>
										</section>
										<section className='edit-profile-g-date'>
											<label htmlFor='date'>
												Date of birth : &nbsp;
											</label>
											<section className='edit-profile-input-date'>
												<select
													name='date'
													value={
														updateProfileValue.date
													}
													onChange={(e) =>
														handleInputForm(
															'date',
															e.target.value,
														)
													}
													className='edit-profile-input'>
													<option
														value=''
														disabled
														hidden>
														Select Day
													</option>
													{Array.from(
														{ length: 31 },
														(_, index) => (
															<option
																key={index + 1}
																value={(
																	index + 1
																)
																	.toString()
																	.padStart(
																		2,
																		'0',
																	)}>
																{index + 1}
															</option>
														),
													)}
												</select>
												<select
													name='month'
													className='edit-profile-input'
													value={
														updateProfileValue.month
													}
													onChange={(e) =>
														handleInputForm(
															'month',
															e.target.value,
														)
													}>
													<option
														value=''
														disabled
														hidden>
														Select Month
													</option>
													{Array.from(
														{ length: 12 },
														(_, index) => (
															<option
																key={index + 1}
																value={(
																	index + 1
																)
																	.toString()
																	.padStart(
																		2,
																		'0',
																	)}>
																{index + 1}
															</option>
														),
													)}
												</select>
												<select
													name='year'
													className='edit-profile-input'
													value={
														updateProfileValue.year
													}
													onChange={(e) =>
														handleInputForm(
															'year',
															e.target.value,
														)
													}>
													<option
														value=''
														disabled
														hidden>
														Select Year
													</option>
													{years.map((year) => (
														<option
															key={year}
															value={year.toString()}>
															{year}
														</option>
													))}
												</select>
											</section>
										</section>
									</section>
								</section>
							</section>
							<section className='edit-profile-button-layout'>
								<button
									className='edit-profile-button'
									onClick={submitForm}>
									Confirm
								</button>
							</section>
						</section>
					)}
				</section>
			</main>
			<Footer />
			<Outlet />
		</section>
	);
};

export default Profile;
