import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

import { getAuthUser } from './auth/authSlice';
import { URL_ACCEPT_AGREEMENT } from '../api/userAPI';


const initialState = {
	vendor: null,
	status: 'idle',
	error: null,
};

export const acceptAgreement = createAsyncThunk(
	'vendor/acceptAgreement',
	async ({ is_vendor_agreement }, { dispatch }) => {
		const accessToken = Cookies.get('accessToken')
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
	},
});

export const { onAcceptAgreement } = vendorSlice.actions;

export default vendorSlice.reducer;
