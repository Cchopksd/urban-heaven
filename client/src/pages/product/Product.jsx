/* eslint-disable no-undef */
const Product = () => {

	const handleOmise = () => {
		OmiseCard.configure({
			publicKey: 'pkey_test_5z2lrsfwmz49f8q9akt',
			image: 'https://cdn.omise.co/assets/dashboard/images/omise-logo.png',
			amount: 99500,
			submitFormTarget: '#my-custom-checkout-form',
		});

		// Configuring your own custom button
		OmiseCard.configureButton('#checkout-button-1', {
			frameLabel: 'Merchant',
			submitLabel: 'PAY RIGHT NOW !',
		});

		// Then, attach all of the config and initiate it by 'OmiseCard.attach();' method
		OmiseCard.attach();
	};
	return (
		<div>
			<h1>Example 5: Custom Integration Specify Checkout Form</h1>
			<p>Submit form via button element outside the form.</p>

			<div>
				<button
					onClick={handleOmise}
					id='checkout-button-1'>
					Checkout Button number 1 !
				</button>
				<form
					id='my-custom-checkout-form'
					name='checkoutForm'
					action='/checkout'>
					<input
						type='hidden'
						name='sample-number'
						value='sample-5'
					/>
				</form>
			</div>
		</div>
	);
};

export default Product;
