import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { IoAddCircleOutline } from 'react-icons/io5';
import { TiEdit } from 'react-icons/ti';

import { getUserAddress } from '../../libs/accountSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './styles/Address.css';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import { getRefreshToken } from '../../libs/auth/authSlice';

const Address = () => {
	const dispatch = useDispatch();
	const { address, status } = useSelector((state) => state.account);
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t('address');
		sessionStorage.setItem('PAGE_URI', '/account/address');
	}, [t]);

	useEffect(() => {
		// Dispatch getUserAddress immediately
		dispatch(getUserAddress());

		const refreshTimeout = setTimeout(() => {
			dispatch(getRefreshToken());
		}, 2000);
		return () => clearTimeout(refreshTimeout);
	}, [dispatch]);

	return (
		<div className='address-screen'>
			<Navbar />
			<main className='address-container'>
				<section className='address-sec-content'>
					<section className='address-sec-header-layout'>
						<section className='address-sec-header'>
							<BackButton />
							<h1 className='address-head'>{t('address')}</h1>
						</section>
						<hr className='address-head-line' />
					</section>
					{status === 'loading' ? (
						<section className='loader'>
							<TailSpin
								visible={true}
								height='20'
								width='20'
								color='#000000'
								ariaLabel='tail-spin-loading'
								radius='1'
								wrapperStyle={{}}
								wrapperClass=''
							/>
						</section>
					) : (
						<section className='address-box-info'>
							{address?.payload[0]?.address_uuid === null ? (
								<section className='address-empty-layout'>
									<section className='address-empty'>
										<Link
											to={'/account/address/increase'}
											className='add-address-button'>
											<IoAddCircleOutline className='add-address-icon' />
										</Link>
										<p>{t('addAddressForShipping')}</p>
									</section>
								</section>
							) : (
								<section className='address-info'>
									{address?.payload?.map((item, index) => (
										<section
											className='address-box-detail'
											key={item.address_uuid}>
											<ul className='address-info-group'>
												<li className='address-detail'>
													{index + 1}. &nbsp;
													{item.address_label}
												</li>
												<li className='address-detail'>
													{item.province}
												</li>
												<li className='address-detail'>
													{item.county}
												</li>
												<li className='address-detail'>
													{item.district}
												</li>
												<li className='address-detail'>
													{item.postal_code}
												</li>
												<li className='address-detail'>
													{item.address_line_1}
												</li>
												<li className='address-detail'>
													{item.address_line_2}
												</li>
											</ul>
											<div className='address-detail'>
												<TiEdit />
											</div>
										</section>
									))}
								</section>
							)}
						</section>
					)}
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Address;
