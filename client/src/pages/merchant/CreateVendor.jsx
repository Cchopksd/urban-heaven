import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { clearForm, createShop } from '../../libs/merchantSlice';
import IDCard from '../../components/tips/IDCard';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/CreateVendor.css';
import axios from 'axios';
import SubmitButton from '../../components/SubmitButton';
import PersonImage from '../../components/imageUpload/PersonImage';
import IdCardUpload from '../../components/imageUpload/IdCardUpload';

const CreateVendor = () => {
	const dispatch = useDispatch();
	const { createShopValue } = useSelector((state) => state.merchant);
	const [ip, setIP] = useState('');

	const getData = async () => {
		const res = await axios.get('https://api.ipify.org/?format=json');
		console.log(res.data);
		setIP(res.data.ip);
	};

	const handleShopChange = (field, value) => {
		if (field === 'personal_id') {
			if (/^\d*$/.test(value) && value.length <= 13) {
				dispatch(createShop({ [field]: value }));
			}
		} else if (field === 'shop_tel') {
			if (/^\d*$/.test(value) && value.length <= 10) {
				dispatch(createShop({ [field]: value }));
			}
		} else {
			dispatch(createShop({ [field]: value }));
		}

	};

	return (
		<div className='create-vendor-screen'>
			<Navbar />
			<main className='create-vendor-main'>
				<section className='create-vendor-content-layout'>
					<section className='create-vendor-content'>
						<section className='create-vendor-content-header'>
							<BackButton step='/account' />
							<h1 className='create-vendor-text-header'>
								Create vendor
							</h1>
						</section>
						<hr className='create-vendor-line' />
						<section className='create-vendor-content-body-layout'>
							<section className='create-vendor-content-body'>
								<div className='create-merchant-input-box'>
									<label>ชื่อร้านค้า :</label>
									<input
										type='text'
										className='create-merchant-input'
										value={createShopValue.shope_name}
										onChange={(e) => {
											handleShopChange(
												'shop_name',
												e.target.value,
											);
										}}
									/>
								</div>
								<div className='create-merchant-input-box'>
									<label>อีเมลติดต่อ :</label>
									<input
										type='text'
										className='create-merchant-input'
										value={createShopValue.shop_email}
										onChange={(e) => {
											handleShopChange(
												'shop_email',
												e.target.value,
											);
										}}
									/>
								</div>
								<div className='create-merchant-input-box'>
									<label>เบอร์ติดต่อ :</label>
									<input
										type='text'
										className='create-merchant-input'
										value={createShopValue.shop_tel}
										onChange={(e) => {
											handleShopChange(
												'shop_tel',
												e.target.value,
											);
										}}
									/>
								</div>
								<div className='create-merchant-input-box'>
									<label>รายละเอียดร้านค้า :</label>
									<textarea
										id='story'
										name='story'
										rows='5'
										cols='33'
										className='create-merchant-textarea'
										value={createShopValue.shop_address}
										onChange={(e) => {
											handleShopChange(
												'description',
												e.target.value,
											);
										}}
									/>
								</div>
								<section>
									<p>Payment Method :</p>
									<section className='create-merchant-payment-method'>
										<label className='create-merchant-payment-method-label'>
											<input
												type='checkbox'
												name=''
												id=''
												checked={
													createShopValue.promptpay
												}
												onChange={(e) => {
													handleShopChange(
														'promptpay',
														e.target.checked,
													);
												}}
											/>
											PromptPay
										</label>
										<label>
											<input
												type='checkbox'
												name=''
												id=''
												checked={
													createShopValue.google_pay
												}
												onChange={(e) => {
													handleShopChange(
														'google_pay',
														e.target.checked,
													);
												}}
											/>
											Google pay
										</label>

										<label>
											<input
												type='checkbox'
												name=''
												id=''
												checked={createShopValue.card}
												onChange={(e) => {
													handleShopChange(
														'card',
														e.target.checked,
													);
												}}
											/>
											Card
										</label>
										<label>
											<input
												type='checkbox'
												name=''
												id=''
												checked={
													createShopValue.cash
												}
												onChange={(e) => {
													handleShopChange(
														'cash',
														e.target.checked,
													);
												}}
											/>
											Cash on delivery
										</label>
									</section>
								</section>
								<div className='create-merchant-input-box'>
									<label htmlFor=''>Personal ID:</label>
									<input
										type='text'
										className='create-merchant-input'
										value={createShopValue.personal_id}
										onChange={(e) => {
											handleShopChange(
												'personal_id',
												e.target.value,
											);
										}}
									/>
								</div>
								<IdCardUpload />
								<PersonImage />
								{/* <button
									className='create-merchant-submit-button'
									onClick={handleSubmitForm}>
									<b>Submit</b>
								</button> */}
								<SubmitButton />
							</section>
						</section>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default CreateVendor;
