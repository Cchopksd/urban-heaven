import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/IncreaseAddress.css';
import BackButton from '../../components/BackButton';

import {
	getDistrictAPI,
	getProvinceAPI,
	getSubdistrictAPI,
	increaseAddress,
	getPostID,
	createAddress,
} from '../../libs/accountSlice';

const IncreaseAddress = () => {
	const dispatch = useDispatch();
	const { getProvinceData, increaseAddressValue } = useSelector(
		(state) => state.account,
	);
	const { t } = useTranslation();

	useEffect(() => {
		document.title = t('increase-address');
		sessionStorage.setItem('PAGE_URI', '/account/address/increase');
		dispatch(getProvinceAPI());
	}, [t, dispatch]);

	const handleOnChange = (field, value) => {
		dispatch(increaseAddress({ [field]: value }));
		if (field === 'province' && value !== null) {
			dispatch(getDistrictAPI());
		}
		if (field === 'district' && value !== null) {
			dispatch(getSubdistrictAPI());
		}
		if (field === 'subdistrict' && value !== null) {
			dispatch(getPostID(value));
		}
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		dispatch(createAddress({ increaseAddressValue }));
	};

	return (
		<div className='increase-address-screen'>
			<Navbar />
			<main className='increase-address-layout'>
				<section className='increase-address-container'>
					<section className='increase-address-header'>
						<BackButton />
						<h1 className='increase-address-head'>
							{t('increaseAddress')}
						</h1>
					</section>
					<hr className='increase-address-head-line' />
					<section className='increase-address-form-layout'>
						<section className='increase-address-form'>
							<div className='increase-address-input'>
								<label htmlFor='province'>Province :</label>
								<select
									name='province'
									id='province'
									className='increase-address-input-form'
									value={increaseAddressValue.province}
									onChange={(e) => {
										handleOnChange(
											'province',
											e.target.value,
										);
									}}>
									<option>Select Province</option>
									{getProvinceData.province.map(
										(province, index) => (
											<option
												key={index}
												value={province.province_code}>
												{province.province_name_th}
											</option>
										),
									)}
								</select>
							</div>
							<div className='increase-address-input'>
								<label htmlFor='county'>District :</label>
								<select
									name='district'
									id='district'
									className='increase-address-input-form'
									value={increaseAddressValue.district}
									onChange={(e) => {
										handleOnChange(
											'district',
											e.target.value,
										);
									}}>
									<option>Please Select District</option>
									{getProvinceData.district.map(
										(district, index) => (
											<option
												key={index}
												value={district.district_code}>
												{district.district_name_th}
											</option>
										),
									)}
								</select>
							</div>
							<div className='increase-address-input'>
								<label htmlFor='district'>Subdistrict :</label>
								<select
									name='subdistrict'
									id='subdistrict'
									className='increase-address-input-form'
									value={increaseAddressValue.subdistrict}
									onChange={(e) => {
										handleOnChange(
											'subdistrict',
											e.target.value,
										);
									}}>
									{increaseAddressValue.subdistrict ? (
										<option>Please Select District</option>
									) : (
										<option>Select Subdistrict</option>
									)}
									{getProvinceData.subdistrict.map(
										(subdistrict, index) => (
											<option
												key={index}
												value={subdistrict.postal_code}>
												{
													subdistrict.subdistrict_name_th
												}
											</option>
										),
									)}
								</select>
							</div>
							<div className='increase-address-input'>
								<label htmlFor='postal_code'>Postal Code</label>
								<input
									className='increase-address-input-form'
									name='address-checkbox'
									type='text'
									onChange={(e) => {
										handleOnChange(
											'postal_code',
											e.target.value,
										);
									}}
									value={increaseAddressValue.postal_code}
								/>
							</div>
							<div className='increase-address-field'>
								<label htmlFor='address_line_1'>
									Address 1 :
								</label>
								<textarea
									className='increase-address-field-form'
									name='address_line_1'
									type='text'
									onChange={(e) => {
										handleOnChange(
											'address_line_1',
											e.target.value,
										);
									}}
								/>
							</div>
							<div className='increase-address-field'>
								<label htmlFor='address_line_2'>
									Address 2 :
								</label>
								<textarea
									className='increase-address-field-form'
									name='address_line_2'
									type='text'
									onChange={(e) => {
										handleOnChange(
											'address_line_2',
											e.target.value,
										);
									}}
								/>
							</div>
							<div className='increase-address-input'>
								<label htmlFor='address_label'>
									Address Tag :
								</label>
								<input
									className='increase-address-input-form'
									name='address_label'
									type='text'
									onChange={(e) => {
										handleOnChange(
											'address_label',
											e.target.value,
										);
									}}
								/>
							</div>
							{/* <label>
								<input
									className='increase-address-input-checkbox'
									name='address_default'
									type='checkbox'
									onChange={(e) => {
										handleOnChange(
											'address_default',
											e.target.value,
										);
									}}
								/>
								Default
							</label> */}
							<button
								className='increase-address-submit'
								onClick={handleOnSubmit}>
								Submit
							</button>
						</section>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default IncreaseAddress;
