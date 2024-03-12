import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';
import { getRefreshToken } from '../libs/auth/authSlice';

const IsTokenExpired = ({ children }) => {
	const dispatch = useDispatch();

	const accessToken = Cookie.get('accessToken');
	if (accessToken) {
		if (jwtDecode(accessToken).exp < Date.now() / 1000) {
			dispatch(getRefreshToken());
		}
	}

	const refreshToken = Cookie.get('refreshToken');
	if (refreshToken) {
		if (jwtDecode(refreshToken).exp < Date.now() / 1000) {
			localStorage.clear();
		}
	}
	return children;
};

export default IsTokenExpired;
