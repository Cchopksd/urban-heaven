import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IoIosArrowForward } from 'react-icons/io';

import Navbar from '../components/Navbar';
import './styles/Overview.css';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const Overview = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.title = t('Overview');
		sessionStorage.setItem('PAGE_URI', '/account/overview');
	});
	return (
		<div className='overview-page'>
			<Navbar />
			<main className='overview-main'>
				{/* <section>
					<section>Seller Dashboard</section>
				</section> */}
				<article className='overview-sec-profile-layout'>
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
							<Link className='overview-sec-profile-per-group-link'>
								<span className='overview-label'>
									{t('startSelling')}
								</span>
								<IoIosArrowForward />
							</Link>
						</section>
					</section>
				</article>
				<article className='overview-sec-profile-layout'>
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
				</article>
				<article className='overview-sec-profile-layout'>
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
				</article>
				<article className='overview-sec-profile-layout'>
					<section className='overview-sec-profile-content'>
						<h1 className='overview-sec-header'>Support</h1>
					</section>
				</article>
			</main>
			<Footer />
		</div>
	);
};

export default Overview;
