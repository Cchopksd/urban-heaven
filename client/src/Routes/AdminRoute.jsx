// import { Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
	const {user } = useSelector((state) => state.auth);
	if (user.payload.role === 'admin') {
		<Navigate
			to={'/admin'}
			replace
		/>;
	}
	return children;
};

export default AdminRoute;
