import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/AgreementForVendor.css';

const AgreementForVendor = () => {
	const { user } = useSelector((state) => state.auth);
	return (
		<div className='agreement-vendor-screen'>
			<Navbar />
			<main className='agreement-vendor-main'>
				<section className='agreement-vendor-layout'>
					<section className='agreement-vendor-container'>
						<section>
							<h1 className='agreement-vendor-head'>Agreement</h1>
							<article className='agreement-vendor-content'>
								Lorem ipsum dolor sit, amet consectetur
								adipisicing elit. Doloribus inventore omnis
								repellendus veritatis facere voluptate esse
								accusamus tempore? Praesentium, perferendis!
								Repellendus ipsam tenetur fugit alias iste
								temporibus, nisi enim. Impedit.
							</article>
						</section>
						<label className='agreement-vendor-checkbox'>
							<input
								type='checkbox'
								name=''
								id=''
							/>
							I accept of this agreement
						</label>
					</section>
					<section className='agreement-vendor-container-agreed'>
						<button className='agreement-vendor-btn'>Accept</button>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default AgreementForVendor;
