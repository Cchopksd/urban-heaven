import { useState } from 'react';
import ReactLoading from 'react-loading';
import { useDispatch, useSelector } from 'react-redux';

import { requestShop } from '../libs/merchantSlice';
import './styles/SubmitButton.css';

const SubmitButton = () => {
	const dispatch = useDispatch();
	const { status, createShopValue } = useSelector((state) => state.merchant);


	const handleSubmitForm = () => {
		dispatch(requestShop({ createShopValue }));
	};

	return (
		<div className='submit-component'>
			<button
				className='button-submit-animated'
				onClick={handleSubmitForm}>
				{status === 'loading' ? (
					<ReactLoading
						type={'cylon'}
						color={'#ffffff'}
					/>
				) : status === 'succeeded' ? (
					<div className='wrapper'>
						<svg
							className='animated-check'
							viewBox='0 0 24 24'>
							<path
								d='M4.1 12.7L9 17.6 20.3 6.3'
								fill='none'
							/>
						</svg>
						Success
					</div>
				) : (
					<div className='form-success'>Submit</div>
				)}
			</button>
		</div>
	);
};

export default SubmitButton;
