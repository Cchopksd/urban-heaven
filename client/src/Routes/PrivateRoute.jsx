// import { Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Cookie from 'js-cookie';

import { getRefreshToken } from '../libs/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
	const dispatch = useDispatch();

	const refreshToken = Cookie.get('refreshToken');
	if (refreshToken) {
		if (jwtDecode(refreshToken).exp < Date.now() / 1000) {
			localStorage.clear();
		}
	}

	const accessToken = Cookie.get('accessToken');
	if (accessToken) {
		if (jwtDecode(accessToken).exp < Date.now() / 1000) {
			dispatch(getRefreshToken());
			window.location.reload()
		} else {
			return children;
		}
	}


	return refreshToken ? (
		children
	) : (
		<Navigate
			to={'/'}
			replace
		/>
	);
};

export default PrivateRoute;
