import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/Security.css';
import BackButton from '../../components/BackButton';

const Security = () => {
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t('security');
		sessionStorage.setItem('PAGE_URI', '/account/security');
	});

	return (
		<div className='security-screen'>
			<Navbar />
			<main className='security-container'>
				<section className='security-sec-content'>
					<section className='security-sec-header-layout'>
						<section className='security-sec-header'>
							<BackButton />
							<h1 className='security-head'>{t('security')}</h1>
							<div className='hide-element'>
								<BackButton />
							</div>
						</section>
						<hr className='security-head-line' />
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Security;
