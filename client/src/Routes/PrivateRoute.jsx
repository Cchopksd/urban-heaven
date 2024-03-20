import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Cookie from 'js-cookie';
import { getRefreshToken } from '../libs/auth/authSlice';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
	const dispatch = useDispatch();


	const refreshToken = Cookie.get('refreshToken');

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
