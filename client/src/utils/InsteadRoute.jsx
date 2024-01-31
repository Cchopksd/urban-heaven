import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const InsteadRoute = ({ OpenModal }) => {
	const navigate = useNavigate();
	let { pathname } = useLocation();
	const [loading, setLoading] = useState(true);
	const miniConfig = sessionStorage.getItem('mini-session');
	const { config } = JSON.parse(miniConfig);
	console.log(config);

	useEffect(() => {
		setLoading(false);
	}, [pathname, config]);

	if (loading) {
		return null;
	}

	if (config) {
		return navigate('/account/edit-profile');
	} else {
		console.log('err');
		return OpenModal();
	}
};

export default InsteadRoute;
