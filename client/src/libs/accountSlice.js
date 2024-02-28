import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import {
	URL_GET_USER_DATA,
	URL_GET_USER_ADDRESS,
	URL_RESET_PASSWORD,
	URL_GET_USER_AGREEMENT,
} from '../api/userAPI';

const initialState = {
	user: null,
	address: null,
	isVendorAgreement: false,
	status: 'idle',
	error: null,
	inputPassword: null,
	inputConfirmPassword: null,
};

export const getUserData = createAsyncThunk('account/getData', async () => {
	try {
		const accessToken = Cookies.get('accessToken');
		const response = await axios.get(URL_GET_USER_DATA, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (err) {
		console.log(err);
	}
});

export const getUserAddress = createAsyncThunk(
	'account/getAddress',
	async () => {
		try {
			const accessToken = Cookies.get('accessToken');
			const response = await axios.get(URL_GET_USER_ADDRESS, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data;
		}
	},
);

export const getUserAgreement = createAsyncThunk(
	'account/getAgreement',
	async () => {
		try {
			const accessToken = Cookies.get('accessToken');
			const response = await axios.get(URL_GET_USER_AGREEMENT, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			return response.data.is_vendor_agreement;
		} catch (err) {
			console.log(err);
			return err.response.data;
		}
	},
);

export const resetPassword = createAsyncThunk(
	'account/resetPassword',
	async ({ password }) => {
		try {
			const accessToken = Cookies.get('accessToken');
			const response = await axios.patch(
				URL_RESET_PASSWORD,
				{ password },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data;
		}
	},
);

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {
		editProfile: (state, action) => {
			state.isEditAccount = action.payload;
		},
		updateValue: (state, action) => {
			state.value = action.payload;
		},
		setInputPassword: (state, action) => {
			state.status = 'succeeded';
			state.inputPassword = action.payload;
		},
		setInputConfirmPassword: (state, action) => {
			state.status = 'succeeded';
			state.inputConfirmPassword = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(getUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getUserAgreement.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserAgreement.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isVendorAgreement = action.payload;
			})
			.addCase(getUserAgreement.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getUserAddress.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUserAddress.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.address = action.payload;
			})
			.addCase(getUserAddress.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {
	clearUser,
	editProfile,
	setInputPassword,
	setInputConfirmPassword,
} = accountSlice.actions;

// Selectors
export const selectInputPassword = (state) => state.inputPassword;
export const selectInputConfirmPassword = (state) => state.setInputConfirmPassword;
// export const selectLoginStatus = (state) => state.login.status;
// export const selectLoginError = (state) => state.login.error;

export default accountSlice.reducer;
