import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const IsLoggedIn = ({ children }) => {
	const { status, isUserLoggedIn } = useSelector((state) => state.auth);

	if (status === 'loading') return null;
	else if (status === 'failed' || isUserLoggedIn === false) return children;
	else if (isUserLoggedIn === true) {
		return <Navigate to={'/'} />;
	} else {
		return null;
	}
};

export default IsLoggedIn;

IsLoggedIn.propTypes = {
	children: PropTypes.node,
};
