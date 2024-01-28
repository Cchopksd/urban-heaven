import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [config, setConfig] = useState('');
	const miniConfig = { config };
	localStorage.setItem('mini-config', JSON.stringify(miniConfig));

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/pull-user-data`,
				{
					withCredentials: true,
				},
			);
			setConfig(response.data);
			setLoading(false);
		} catch (e) {
			console.log(e.response.message);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Context.Provider value={{ loading, fetchData, config }}>
			{children}
		</Context.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { Context, Provider };
