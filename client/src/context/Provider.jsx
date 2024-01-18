import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Context = createContext();

const Provider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState('');
	const { user } = data;

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/dashboard`,
				{
					withCredentials: true,
				},
			);
            setData(response.data);
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
		<Context.Provider value={{ user, loading, data, fetchData }}>
			{children}
		</Context.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
};

export { Context, Provider };
