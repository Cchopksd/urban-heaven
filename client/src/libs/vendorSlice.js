import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getAuthUser } from './auth/authSlice';
import { URL_ACCEPT_AGREEMENT } from '../api/userAPI';

const initialState = {
	vendor: null,
	status: 'idle',
	error: null,
	createShopValue: {
		shop_name: '',
		shop_email: '',
		shop_tel: '',
		shop_address: '',
		payment_method: {
			promptpay: false,
			card: false,
			google_pay: false,
			delivery: false,
		},
		personal_id: '',
		personal_id_image: '',
		personal_image: '',
	},
};

export const acceptAgreement = createAsyncThunk(
	'vendor/acceptAgreement',
	async ({ is_vendor_agreement }, { dispatch }) => {
		const accessToken = Cookies.get('accessToken');
		try {
			const response = await axios.patch(
				URL_ACCEPT_AGREEMENT,
				{ is_vendor_agreement },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);
			dispatch(getAuthUser());
			return response.data;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
);

const vendorSlice = createSlice({
	name: 'vendor',
	initialState,
	reducers: {
		acceptAgreement: (state, action) => {
			state.status = 'succeeded';
		},
		createShop: (state, action) => {
			state.createShopValue = {
				...state.createShopValue,
				...action.payload,
			};
		},
	},
});

export const { onAcceptAgreement, createShop } = vendorSlice.actions;

export default vendorSlice.reducer;
