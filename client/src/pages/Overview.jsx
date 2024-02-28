import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';

import { sendEmailVerify, getAuthUser } from '../libs/auth/authSlice';
import Navbar from '../components/Navbar';
import './styles/Overview.css';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const Overview = () => {
	// useEffect(() => {
	// 	dispatch(getAuthUser());
	// }, [dispatch]);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('Overview');
		sessionStorage.setItem('PAGE_URI', '/account/overview');
	});
	const handleSendEmail = () => {
		dispatch(sendEmailVerify());
	};

	const handleRefresh = () => {
		dispatch(getAuthUser());
	}

	return (
		<div className='overview-page'>
			<Navbar />
			<main className='overview-main'>
				{user.payload.is_verified ? null : (
					<div className='overview-sec-profile-layout-is-unverified'>
						<section className='overview-sec-profile-content-is-unverified'>
							<h3 className='overview-sec-header'>
								This account is unverified
							</h3>
							<section className='overview-sec-profile-content-is-unverified-func'>
								<button
									className='button-send-email-verify'
									onClick={handleSendEmail}>
									<h3>Verify Email</h3>
								</button>
								<h1>|</h1>
								<button
									className='button-send-email-verify'
									onClick={handleRefresh}>
									<h3>Has Verified</h3>
								</button>
							</section>
						</section>
					</div>
				)}

				<div className='overview-sec-profile-layout'>
					<section className='overview-sec-profile-content'>
						<h1 className='overview-sec-header'>{t('account')}</h1>
						<section className='overview-sec-profile-group-link'>
							<Link
								to={'/account/edit-profile'}
								className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									{t('editProfile')}
								</span>
								<IoIosArrowForward />
							</Link>
							<Link
								to={'/account/security'}
								className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									{t('security')}
								</span>
								<IoIosArrowForward />
							</Link>
							<Link
								to={'/account/address'}
								className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									{t('address')}
								</span>
								<IoIosArrowForward />
							</Link>
							<Link
								to={
									user.payload.is_vendor_agreement
										? '/account/create-vendor'
										: '/account/agreement-for-vendor'
								}
								className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									{t('startSelling')}
								</span>
								<IoIosArrowForward />
							</Link>
						</section>
					</section>
				</div>
				<div className='overview-sec-profile-layout'>
					<section className='overview-sec-profile-content'>
						<h1 className='overview-sec-header'>My Purchase</h1>
						<section className='overview-sec-profile-group-link'>
							<Link className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									My Refund
								</span>
								<IoIosArrowForward />
							</Link>
						</section>
						<section className='overview-sec-profile-group-link'>
							<Link className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									My Orders
								</span>
								<IoIosArrowForward />
							</Link>
						</section>
					</section>
				</div>
				<div className='overview-sec-profile-layout'>
					<section className='overview-sec-profile-content'>
						<h1 className='overview-sec-header'>Payment</h1>
						<section className='overview-sec-profile-group-link'>
							<Link className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									Payment Method
								</span>
								<IoIosArrowForward />
							</Link>
						</section>
						<section className='overview-sec-profile-group-link'>
							<Link className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>Redeem </span>
								<IoIosArrowForward />
							</Link>
						</section>
					</section>
				</div>
				<div className='overview-sec-profile-layout'>
					<section className='overview-sec-profile-content'>
						<h1 className='overview-sec-header'>Support</h1>
					</section>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default Overview;
