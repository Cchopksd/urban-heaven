// import { Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
	const { status, user } = useSelector((state) => state.auth);
	if (user.payload.is_vendor_agreement === true) {
		return children;
	}
	<Navigate
		to={'/'}
		replace
	/>;
};

export default AdminRoute;
