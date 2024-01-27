import { useTranslation } from 'react-i18next';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import './styles/NoMatch.css';
import { useEffect } from 'react';

const NoMatchRoute = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('pageError');
	});
	return (
		<div className='no-screen'>
			<Navbar />
			<main className='no-container '>
				<h1>{t('pageError')}</h1>
			</main>
			<Footer />
		</div>
	);
};

export default NoMatchRoute;
