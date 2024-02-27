import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUserAgreement } from '../libs/accountSlice';

const IsAcceptVendor = ({ children }) => {
	const dispatch = useDispatch();
	const { isVendorAgreement, status } = useSelector((state) => state.account);

	useEffect(() => {
		dispatch(getUserAgreement());
	}, [dispatch]);

	if (status === 'loading') {
		return null;
	} else if (status === 'failed' || isVendorAgreement === false) {
		return children;
	} else if (isVendorAgreement === true) {
		return (
			<Navigate
				to='/account/'
				replace
			/>
		);
	}

	return null;
};

export default IsAcceptVendor;

IsAcceptVendor.propTypes = {
	children: PropTypes.element.isRequired,
};
