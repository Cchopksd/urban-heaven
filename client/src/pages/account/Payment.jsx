import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Payment.css';
import BackButton from '../../components/BackButton';

const Payment = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('payment');
		sessionStorage.setItem('PAGE_URI', '/account/payment');
	});
	return (
		<div className='payment-screen'>
			<Navbar />
			<main className='payment-layout'>
				<section className='payment-sec-content'>
					<BackButton />
					<p>payment</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Payment;
