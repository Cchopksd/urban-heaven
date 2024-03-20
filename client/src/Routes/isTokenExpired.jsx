import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';
import { getRefreshToken } from '../libs/auth/authSlice';
import { useEffect } from 'react';

const IsTokenExpired = ({ children }) => {
	const dispatch = useDispatch();
	const refreshToken = Cookie.get('refreshToken');
	var accessToken = Cookie.get('accessToken');

	const refresh = () => {
		if (accessToken) {
			try {
				const decodedAccessToken = jwtDecode(accessToken);
				if (decodedAccessToken.exp < Date.now() / 1000) {
					dispatch(getRefreshToken());
				}
			} catch (error) {
				console.error('Error decoding access token:', error);
			}
		} else {
			dispatch(getRefreshToken());
		}
	};

		refresh();

	return children;
};

export default IsTokenExpired;
