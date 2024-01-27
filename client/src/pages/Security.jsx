import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './styles/ChangePassword.css';

const ChangePassword = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('security');
		sessionStorage.setItem('PAGE_URI', '/account/security');
	});
	return (
		<div className='change-password-screen'>
			<Navbar />
			<main className='change-password-container'>
				<Sidebar />
				<section className='change-password-sec-content'>
					<p>change-password</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default ChangePassword;
