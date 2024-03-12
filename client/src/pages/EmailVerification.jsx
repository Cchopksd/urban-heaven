import { useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_VERIFY_EMAIL } from '../api/userAPI';
import { useEffect, useState } from 'react';

import './styles/EmailVerification.css';
import EmailAlreadyVerify from './EmailAlreadyVerify';
import mail from '../assets/images/safe-mail.png';
import { TailSpin } from 'react-loader-spinner';

const EmailVerification = () => {
	const { params } = useParams();

	const [isVerified, setIsVerified] = useState();
	const [isUnauthorized, setIsUnauthorized] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const response = await axios.post(
					`${URL_VERIFY_EMAIL}/${params}`,
					{
						withCredentials: true,
					},
				);
				setIsVerified(response.data.success);
				console.log(response);
				setLoading(true);
				return;
			} catch (err) {
				console.error(err.response.data.message);
				setIsUnauthorized(err.response.data.message);
				setLoading(true);
				return err.response;
			}
		};
		verifyEmail();
	}, [params]);

	return (
		<div
			id='email-verification-screen'
			className='email-verification-screen'>
			{loading ? (
				<div>
					{isUnauthorized ===
					'Unauthorized - Token has expired' ? (
						<h1>This email has expired</h1>
					) : (
						<div>
							{isVerified ? (
								<div>
									<h1>Email Verification</h1>
									<main className='email-verification-container'>
										<section>
											<h2>URBAN-HEAVEN</h2>
											<img
												src={mail}
												alt='Email Verification'
												className='email-verified-image'
											/>
											<p>
												<b>Your email has verified</b>
											</p>
										</section>
									</main>
								</div>
							) : (
								<EmailAlreadyVerify />
							)}
						</div>
					)}
				</div>
			) : (
				<section className='loader'>
					<TailSpin
						visible={true}
						height='20'
						width='20'
						color='#000000'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
					/>
				</section>
			)}
		</div>
	);
};

export default EmailVerification;
