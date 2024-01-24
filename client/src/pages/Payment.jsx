import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './styles/Payment.css';

const Payment = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('payment');
	});
	return (
		<div className='payment-screen'>
			<Navbar />
			<main className='payment-layout'>
				<Sidebar />
				<section className='payment-sec-content'>
					<p>payment</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Payment;
