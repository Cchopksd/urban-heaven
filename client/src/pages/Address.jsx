import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import './styles/Address.css';


const Address = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('address');
	},[t]);
	return (
		<div className='address-screen'>
			<Navbar />
			<main className='address-container'>
				<Sidebar />
				<section className='address-sec-content'>
					<p>address</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Address;
