import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/IncreaseAddress.css';
import { IoChevronBackOutline } from 'react-icons/io5';
import BackButton from '../../components/BackButton';

const IncreaseAddress = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('increase-address');
		sessionStorage.setItem('PAGE_URI', '/account/address/increase');
	});
	return (
		<div className='increase-address-screen'>
			<Navbar />
			<main className='increase-address-layout'>
				<section className='increase-address-sec-content'>
					<BackButton />
					<p>Increase address</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default IncreaseAddress;
