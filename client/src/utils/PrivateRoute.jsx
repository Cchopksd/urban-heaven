// import { Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {

	const { status, isUserLoggedIn } = useSelector((state) => state.auth);

	if (status === 'loading') return null;
	return isUserLoggedIn ? (
		children
	) : (
		<Navigate
			to={'/'}
			replace
		/>
	);
};

export default PrivateRoute;
