import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { FaUpload } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';

import { createShop } from '../../libs/vendorSlice';
import IDCard from '../../components/tips/IDCard';
import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/CreateVendor.css';

const CreateVendor = () => {
	const dispatch = useDispatch();
	const { createShopValue } = useSelector((state) => state.vendor);
	const [card, setCard] = useState(null);
	const [person, setPerson] = useState(null);

	const handleShopChange = (field, value) => {
		if (field === 'personal_id_image') {
			setCard(URL.createObjectURL(value));
			dispatch(createShop({ [field]: value }));
		}
		if (field === 'personal_id') {
			if (/^\d*$/.test(value) && value.length <= 13) {
				dispatch(createShop({ [field]: value }));
			}
		} else {
			dispatch(createShop({ [field]: value }));
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles.length > 0) {
			handleShopChange('personal_id_image', {
				target: { files: [droppedFiles[0]] },
			});
		}
	};

	const handleImageClick = () => {
		document.getElementById('upload-photo-instead').click();
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
												'shop_address',
												e.target.value,
											);
										}}
									/>
								</div>
								<section>
									Payment Method :
									<section className='create-merchant-payment-method'>
										<label className='create-merchant-payment-method-label'>
											<input
												type='checkbox'
												name=''
												id=''
												checked={
													createShopValue
														.payment_method
														.promptpay
												}
												onChange={(e) => {
													handleShopChange(
														'payment_method',
														{
															...createShopValue.payment_method,
															promptpay:
																e.target
																	.checked,
														},
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
													createShopValue
														.payment_method
														.google_pay
												}
												onChange={(e) => {
													handleShopChange(
														'payment_method',
														{
															...createShopValue.payment_method,
															google_pay:
																e.target
																	.checked,
														},
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
											/>
											Cards
										</label>
										<label>
											<input
												type='checkbox'
												name=''
												id=''
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

								<div
									onDragOver={handleDragOver}
									onDrop={handleDrop}>
									<p className='create-merchant-card-info'>
										รูปบัตรประชาชน : <IDCard />
									</p>
									<div
										className='create-merchant-image-upload-id-card-box'
										onClick={handleImageClick}>
										{card ? (
											<img
												className='create-merchant-image-upload-id-card'
												src={card}
												alt='Uploaded id-card'
											/>
										) : (
											<div className='image-empty'>
												<FaUpload />
												Drag & DROP
											</div>
										)}
										<input
											id='upload-photo-instead'
											type='file'
											accept='image/*'
											multiple={false}
											onChange={(e) =>
												handleShopChange(
													'personal_id_image',
													e.target.files[0],
												)
											}
										/>
									</div>
								</div>
								<div
									onDragOver={handleDragOver}
									onDrop={handleDrop}>
									รูปคู่กับบัครประชาชน :
									<div
										className='create-merchant-image-upload-id-card-box'
										onClick={handleImageClick}>
										{person ? (
											<img
												className='create-merchant-image-upload-id-card'
												src={person}
												alt='Uploaded id-card'
											/>
										) : (
											<div className='image-empty'>
												<FaUpload />
												Drag & DROP
											</div>
										)}
										<input
											id='upload-photo-instead'
											type='file'
											accept='image/*'
											multiple={false}
											onChange={(e) =>
												handleShopChange(
													'personal_id_image',
													e.target.files[0],
												)
											}
										/>
									</div>
								</div>
								<button className='create-merchant-submit-button'>
									Create shop
								</button>
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
