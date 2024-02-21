import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { acceptAgreement } from '../../libs/vendorSlice';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/AgreementForVendor.css';
import { useState } from 'react';

const AgreementForVendor = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [is_vendor_agreement, setIsChecked] = useState(false);
	const { vendor, isAccept } = useSelector((state) => state.vendor);

	const handleChecked = () => {
		setIsChecked(!is_vendor_agreement);
	};

	const handleAccept = () => {
		dispatch(acceptAgreement({ is_vendor_agreement }));
		navigate('/create-vendor');
	};

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
								checked={is_vendor_agreement}
								onChange={handleChecked}
								name=''
								id=''
							/>
							I accept of this agreement
						</label>
					</section>
					<section className='agreement-vendor-container-agreed'>
						<button
							className={
								is_vendor_agreement
									? 'agreement-vendor-btn'
									: 'agreement-vendor-btn-disable'
							}
							disabled={!is_vendor_agreement}
							onClick={handleAccept}>
							Accept
						</button>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default AgreementForVendor;
