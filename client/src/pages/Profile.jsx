import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';

import { getUserData } from '../features/accountSlice';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './styles/Profile.css';
import Sidebar from '../components/Sidebar';

const Profile = () => {
	const dispatch = useDispatch();
	const { user, status } = useSelector((state) => state.account);
	const { t } = useTranslation();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(getUserData());
		}
	}, [dispatch, status]);

	useEffect(() => {
		document.title = t('profile');
		sessionStorage.setItem('PAGE_URI', '/account/edit-profile');
	}, [t]);

	return (
		<div className='profile-screen'>
			<Navbar />
			<main className='profile-layout'>
				<Sidebar />

				<section className='profile-sec-content'>
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
						<section>
							{/* <div>userData</div> */}
							<input value={user?.result.first_name} />
							<input value={user?.result.last_name} />
							<input value={user?.result.gender} />
							<input value={user?.result.phone} />
							<input value={user?.result.date} />
							<input value={user?.result.month} />
							<input value={user?.result.year} />
						</section>
					)}
				</section>
			</main>
			<Footer />
			<Outlet />
		</div>
	);
};

export default Profile;
