import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getRefreshToken } from '../libs/auth/authSlice';

export const useAuth = (accessToken) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const decodedAccessToken = jwtDecode(accessToken);
		if (decodedAccessToken.exp < Date.now() / 1000) {
			dispatch(getRefreshToken());
		}
	}, [accessToken, dispatch]);
};
