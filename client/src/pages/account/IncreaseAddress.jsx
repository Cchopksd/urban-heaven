import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/IncreaseAddress.css';
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
			<main className='increase-address-container'>
				<section className='increase-address-layout'>
					<section className='increase-address-content'>
						<section className='increase-address-header'>
							<BackButton />
							<h1 className='increase-address-head'>
								{t('increaseAddress')}
							</h1>
						</section>
						<hr className='increase-address-head-line' />
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default IncreaseAddress;
