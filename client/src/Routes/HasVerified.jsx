import { Navigate } from 'react-router-dom';
import { useSelector,  } from 'react-redux';
import PropTypes from 'prop-types';


const HasVerified = ({ children }) => {
	const { user,  } = useSelector((state) => state.auth);
	// console.log(user.payload.is_verified);

	console.log(user);
	if (user.payload.is_verified === true) {
		return <Navigate to='/' replace />;
	} else {
        // navigate('/email-verify');
        return children;
	}
};

export default HasVerified;

HasVerified.propTypes = {
	children: PropTypes.element.isRequired,
};
