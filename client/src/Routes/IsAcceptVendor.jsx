import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUserAgreement } from '../libs/accountSlice';

const IsAcceptVendor = ({ children }) => {
	const dispatch = useDispatch();
	const { is_vendor_agreement, status } = useSelector(
		(state) => state.account,
	);

	useEffect(() => {
		dispatch(getUserAgreement());
	}, [dispatch]);

	if (is_vendor_agreement === true) {
		return (
			<Navigate
				to='/account/'
				replace
			/>
		);
	}
	return children;
};

export default IsAcceptVendor;

IsAcceptVendor.propTypes = {
	children: PropTypes.element.isRequired,
};
