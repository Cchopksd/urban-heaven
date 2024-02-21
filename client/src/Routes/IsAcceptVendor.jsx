import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const IsAcceptVendor = ({ children }) => {
	const { status, user } = useSelector((state) => state.auth);

	if (status === 'loading') {
		return null;
	} else if (
		status === 'failed' ||
		user.payload.is_vendor_agreement === false
	) {
		return children;
	} else if (user.payload.is_vendor_agreement === true) {
		return (
			<Navigate
				to='/account/overview'
				replace
			/>
		);
	}

	return null;
};

export default IsAcceptVendor;
