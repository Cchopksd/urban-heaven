import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { isRequestShop } from '../libs/merchantSlice';

const IsShopRequest = ({ children }) => {
	const dispatch = useDispatch();
	const { isRequest, status } = useSelector((state) => state.merchant);

	useEffect(() => {
		dispatch(isRequestShop());
	}, [dispatch]);

	if (status === 'loading') return null;

	return isRequest ? (
		<Navigate
			to={'/account/shop/wait-for-approve'}
			replace
		/>
	) : (
		children
	);
};

export default IsShopRequest;

IsShopRequest.propTypes = {
	children: PropTypes.node,
};
