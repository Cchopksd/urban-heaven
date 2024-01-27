import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/Sidebar.css';

const Sidebar = () => {
	const { t } = useTranslation();
	const [selectedLink] = useState(location.pathname);

	return (
		<main className='profile-sec-ops'>
			<nav className='profile-option'>
				<Link
					to={`/account/edit-profile`}
					className={`profile-each-option ${
						selectedLink.startsWith('/account/edit-profile')
							? 'selected'
							: ''
					}`}>
					<b>{t('profile')}</b>
				</Link>
				<hr className='profile-line' />
				<Link
					to={'/account/security'}
					className={`profile-each-option ${
						selectedLink.startsWith('/account/security')
							? 'selected'
							: ''
					}`}>
					<b>{t('security')}</b>
				</Link>
				<hr className='profile-line' />
				<Link
					to={'/account/address'}
					className={`profile-each-option ${
						selectedLink.startsWith('/account/address')
							? 'selected'
							: ''
					}`}>
					<b>{t('address')}</b>
				</Link>
				<hr className='profile-line' />
				<Link
					to={'/account/payment'}
					className={`profile-each-option ${
						selectedLink.startsWith('/account/payment')
							? 'selected'
							: ''
					}`}>
					<b>{t('payment')}</b>
				</Link>
				<hr className='profile-line' />
			</nav>
		</main>
	);
};

export default Sidebar;
