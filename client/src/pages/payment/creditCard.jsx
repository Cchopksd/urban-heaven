import React, { useEffect } from 'react';
import axios from 'axios';

const Product = () => {
	let Omise = window.Omise;
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.omise.co/omise.js';
		script.async = true;

		script.onload = () => {
			// Initialize Omise
			Omise.setPublicKey('pkey_test_5z334rg00a1b9sza9g3');
		};

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		};
	}, []);

	const handleClick = (e) => {
		e.preventDefault();
		// Use Omise.createSource to create a payment source
		Omise.createSource(
			'promptpay',
			{
				amount: 400000,
				currency: 'THB',
			},
			function (statusCode, response) {
				console.log(response);
			},
		);
	};

	return (
		<div>
			<h1>Example 5: Custom Integration Specify Checkout Form</h1>
			<p>Submit form via button element outside the form.</p>

			<div>
				<button
					id='checkout-button-1'
					onClick={handleClick}>
					Checkout Button number 1 !
				</button>
				<form
					id='my-custom-checkout-form'
					name='checkoutForm'
					action='/checkout'></form>
			</div>
		</div>
	);
};

export default Product;
