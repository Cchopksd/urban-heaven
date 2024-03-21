// import { Middleware } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
	const { user, status } = useSelector((state) => state.auth);
	if (status === 'loading') return null;
	if (user === null) return children;
	if (user.payload.role === 'admin') {
		<Navigate
			to={'/admin'}
			replace
		/>;
	}
	return children;
};

export default AdminRoute;
