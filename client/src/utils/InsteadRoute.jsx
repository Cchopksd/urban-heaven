import { useEffect, useState } from 'react';
import { useLocation, useNavigate, redirect, Navigate } from 'react-router-dom';

const InsteadRoute = () => {
	const navigate = useNavigate();
    let { pathname } = useLocation();
    const [loading,setLoading] = useState(true);
	// console.log(pathname);
	useEffect(() => {
		// Check if the pathname is "/account" or "/account/"
		if (pathname === '/account' || pathname === '/account/') {
			// Perform navigation to "/account/edit-profile"
			return (
				<Navigate
					to='/account/edit-profile'
					replace={true}
				/>
			);
        }
        setLoading(false);
	}, [pathname, navigate]);
};

export default InsteadRoute;
