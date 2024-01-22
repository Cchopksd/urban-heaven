import { Link } from 'react-router-dom';

import { IoArrowForward } from 'react-icons/io5';
import shipping from '../assets/images/icons/shipping-truck.png';
import coupon from '../assets/images/icons/coupon.png';
import marketPlace from '../assets/images/icons/marketplace.png';

import productsData from '../data/item';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import './styles/Dash.css';
import Footer from '../components/Footer';

const Dash = () => {
	const { t } = useTranslation();
	return (
		<div className='dash-screen'>
			<Navbar />
			<Banner />
			<main className='dash-container'>
				<section className='dash-sec-menu'>
					<Link className='dash-sec-menu-layout menu1'>
						<img
							src={shipping}
							alt=''
							className='dash-menu-icons'
						/>
						<label>{t('freeShipping')}</label>
					</Link>
					<Link className='dash-sec-menu-layout menu2'>
						<img
							src={coupon}
							alt=''
							className='dash-menu-icons'
						/>
						<label>{t('discount')}</label>
					</Link>
					<Link className='dash-sec-menu-layout menu3'>
						<img
							src={marketPlace}
							alt=''
							className='dash-menu-icons'
						/>
						<label>{t('become')}</label>
					</Link>
				</section>

				<section className='dash-sec flash-sale'>
					<section className='dash-sec-head-flash'>
						<h1 className='text-flash'>⚡Flash Sale</h1>
						<h4 className='text-see-all'>
							<Link className='link-see-all'>
								See All <IoArrowForward />
							</Link>
						</h4>
					</section>
					<section className='dash-sec-product-flash'>
						{productsData.slice(0, 7).map((index) => (
							<Link
								key={index.id}
								className='flash-link-to-product'>
								<img
									className='thumbnail-image'
									src={index.image}
									alt={index.name}
								/>
								<section className='thumbnail-description'>
									<p>
										<b>{index.name}</b>
									</p>
									<p>Price: ${index.price}</p>
								</section>
							</Link>
						))}
					</section>
				</section>
				<section className='dash-sec'></section>
			</main>
			<Footer/>
		</div>
	);
};

export default Dash;
