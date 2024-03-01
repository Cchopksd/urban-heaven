import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { isValid, parse } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getUserData } from '../../libs/accountSlice';
import { getRefreshToken } from '../../libs/auth/authSlice';

import ImageProfile from '../../components/imageUpload/imageProfile';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Profile.css';

import BackButton from '../../components/BackButton';

const Profile = () => {
	const dispatch = useDispatch();
	const { user, status } = useSelector((state) => state.account);
	// const isEditAccount = useSelector(selectEdit);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(getUserData());
		// const refreshTimeout = setTimeout(() => {
		dispatch(getRefreshToken());
		// });
		// return () => clearTimeout(refreshTimeout);
	}, [dispatch]);

	useEffect(() => {
		document.title = t('profile');
		sessionStorage.setItem('PAGE_URI', '/account/edit-profile');
	}, [t]);

	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: 100 },
		(_, index) => currentYear - index,
	);

	const isDateValid = () => {
		const selectedDate = parse(
			`${user?.payload.year}-${user?.payload.month}-${user?.payload.date}`,
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
														user?.payload.first_name
													}
													// onChange={}
												/>
												<input
													className='edit-profile-input'
													name='lastName'
													id='lastName'
													type='text'
													value={
														user?.payload.last_name
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
													value={user?.payload.phone}
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
														value='male'
														checked={
															user?.payload
																.gender ===
															'male'
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
														value='female'
														checked={
															user?.payload
																.gender ===
															'female'
														}
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
															user?.payload
																.gender ===
															'other'
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
													value={user?.payload.date}
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
													value={user?.payload.month}>
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
													value={user?.payload.year}>
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
									// onClick={(e) => handleSubmit(e)}
								>
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
