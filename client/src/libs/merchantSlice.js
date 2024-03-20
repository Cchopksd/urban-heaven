import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getAuthUser } from './auth/authSlice';
import {
	URL_ACCEPT_AGREEMENT,
	URL_IS_REQUEST_SHOP,
	URL_REQUEST_SHOP,
} from '../api/userAPI';

const initialState = {
	merchant: null,
	status: 'idle',
	error: null,
	isRequest: false,
	createShopValue: {
		shop_name: '',
		shop_email: '',
		shop_tel: '',
		description: '',
		promptpay: false,
		card: false,
		google_pay: false,
		cash: false,
		personal_id: '',
		id_card: '',
		person_image: '',
	},
};

export const acceptAgreement = createAsyncThunk(
	'merchant/acceptAgreement',
	async ({ is_merchant_agreement }, { dispatch }) => {
		const accessToken = Cookies.get('accessToken');
		try {
			const response = await axios.patch(
				URL_ACCEPT_AGREEMENT,
				{ is_merchant_agreement },
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

export const requestShop = createAsyncThunk(
	'merchant/requestShop',
	async ({ createShopValue }, { dispatch }) => {
		console.log(createShopValue);
		const accessToken = Cookies.get('accessToken');

		let formData = new FormData();
		Object.keys(createShopValue).map((fieldName) => {
			console.log(fieldName, createShopValue[fieldName]);
			formData.append(fieldName, createShopValue[fieldName]);
		});
		try {
			const response = await axios.post(URL_REQUEST_SHOP, formData, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'multipart/form-data',
				},
			});
			return response.data;
		} catch (err) {
			console.error(err.response.data);
			return err.response.data;
		}
	},
);

export const isRequestShop = createAsyncThunk(
	'merchant/isRequestShop',
	async () => {
		const accessToken = Cookies.get('accessToken');
		try {
			const response = await axios.get(URL_IS_REQUEST_SHOP, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.data.message;
		} catch (err) {
			console.error(err);
			throw err;
		}
	},
);

const merchantSlice = createSlice({
	name: 'merchant',
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
		clearForm: (state) => {
			state.createShopValue = initialState.createShopValue;
		},
		isRequestShop: (state, action) => {
			state.status = 'succeeded';
			state.isRequest = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(requestShop.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(requestShop.fulfilled, (state, action) => {
				state.status = 'succeeded';
				action.payload;
				setTimeout(() => {
					window.location.reload();
				}, 3000);
			})
			.addCase(requestShop.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			})
			.addCase(isRequestShop.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(isRequestShop.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isRequest = action.payload;
			})
			.addCase(isRequestShop.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error;
			});
	},
});

export const { onAcceptAgreement, createShop, clearForm, } =
	merchantSlice.actions;

export default merchantSlice.reducer;
