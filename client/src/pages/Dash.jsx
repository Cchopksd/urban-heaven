import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

import productsData from '../data/item';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import './styles/Dash.css';

const Dash = () => {
	return (
		<div className='dash-screen'>
			<Navbar />
			<Banner />
			<main className='dash-container'>
				<section className='dash-sec-flash'>
					<section className='dash-sec-head-flash'>
						<h1 className='text-flash'>⚡Flash Sale</h1>
						<h4 className='text-see-all'>
							<Link className='link-see-all'>
								See All <IoArrowForward />
							</Link>
						</h4>
					</section>
					<section>
						
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
			</main>
		</div>
	);
};

export default Dash;
