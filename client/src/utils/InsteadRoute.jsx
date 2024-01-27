import { useEffect } from 'react';
import { useLocation, useNavigate, redirect } from 'react-router-dom';

const InsteadRoute = () => {
	const navigate = useNavigate();
	let { pathname } = useLocation();
	// console.log(pathname);
	useEffect(() => {
		// Check if the pathname is "/account" or "/account/"
		if (pathname === '/account' || pathname === '/account/') {
			// Perform navigation to "/account/edit-profile"
            navigate('/account/edit-profile');

		}
	}, [pathname, navigate]);
};

export default InsteadRoute;
