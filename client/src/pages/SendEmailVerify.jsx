import axios from 'axios';
import Cookies from 'js-cookie';

const SendEmailVerify = () => {
    const accessToken = Cookies.get('accessToken');
    console.log(accessToken);
	const handleClick = async () => {
		await axios.post(
			`${import.meta.env.VITE_BASE_URL}/email-validation`,
			null,
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);
	};
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',

				// flexDirection: 'column',
				justifyContent: 'center',
				margin: 'auto',
			}}>
			<button
				style={{
					// flexDirection: 'column',
					justifyContent: 'center',
					margin: 'auto',
				}}
				onClick={handleClick}>
				Send Email
			</button>
		</div>
	);
};

export default SendEmailVerify;
