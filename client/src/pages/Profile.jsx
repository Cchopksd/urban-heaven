import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './styles/Profile.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const Profile = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState();

	useEffect(() => {
		document.title = t('profile');
		sessionStorage.setItem('PAGE_URI', '/account/profile');
	}, [t]);

	const fetchData = async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_BASE_URL}/get-single-user`,
			{
				withCredentials: true,
			},
		);
		setUserData(response.data.result);
		setLoading(false);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className='profile-screen'>
			<Navbar />
			<main className='profile-layout'>
				<Sidebar />

				<section className='profile-sec-content'>
					{loading ? (
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
							<input value={userData.user_fname}/>
							<input value={userData.user_lname}/>
							<input value={userData.user_gender}/>
							<input value={userData.user_phone}/>
							<input value={userData.user_date}/>
							<input value={userData.user_month}/>
							<input value={userData.user_year}/>
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
