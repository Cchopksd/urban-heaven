import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { sendEmailVerify } from '../libs/auth/authSlice';

const SendEmailVerify = () => {
	const dispatch = useDispatch();

	const handleClick = async () => {
		dispatch(sendEmailVerify());
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
