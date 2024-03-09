import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import {
	URL_GET_USER_DATA,
	URL_GET_USER_ADDRESS,
	URL_RESET_PASSWORD,
	URL_GET_USER_AGREEMENT,
	URL_EDIT_ACCOUNT_DETAILS,
} from '../api/userAPI';
import { getAuthUser } from './auth/authSlice';

const initialState = {
	user: null,
	address: null,

	status: 'idle',
	error: null,
	inputPassword: null,
	inputConfirmPassword: null,
	updateProfileValue: {
		first_name: '',
		last_name: '',
		phone: '',
		gender: '',
		date: '',
		month: '',
		year: '',
		avatar_image: '',
	},
};

export const getUserData = createAsyncThunk(
	'account/getData',
	async (_, { dispatch }) => {
		try {
			const accessToken = Cookies.get('accessToken');
			const response = await axios.get(URL_GET_USER_DATA, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			await response.data;
			return dispatch(updateProfile({ ...response.data.payload }));
		} catch (err) {
			console.log(err);
		}
	},
);

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

export const editAccountDetails = createAsyncThunk(
	'account/editAccountDetails',
	async ({ updateProfileValue }, { dispatch }) => {
		try {
			const formData = new FormData();

			formData.append('first_name', updateProfileValue.first_name);
			formData.append('last_name', updateProfileValue.last_name);
			formData.append('phone', updateProfileValue.phone);
			formData.append('gender', updateProfileValue.gender);
			formData.append('date', updateProfileValue.date);
			formData.append('month', updateProfileValue.month);
			formData.append('year', updateProfileValue.year);
			formData.append('avatar', updateProfileValue.avatar_image);
			console.log(formData);
			const accessToken = Cookies.get('accessToken');
			const response = await axios.patch(
				URL_EDIT_ACCOUNT_DETAILS,
				formData,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'multipart/form-data',
					},
				},
			);
			console.log(response.data);
			dispatch(getUserData());
			dispatch(getAuthUser());
			return response.data;
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
		updateProfile: (state, action) => {
			state.updateProfileValue = {
				...state.updateProfileValue,
				...action.payload,
			};
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
				console.log(action.payload);
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
			})
			.addCase(editAccountDetails.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(editAccountDetails.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(editAccountDetails.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {
	clearUser,
	editProfile,
	updateProfile,
	setInputPassword,
	setInputConfirmPassword,
} = accountSlice.actions;

// Selectors
export const selectInputPassword = (state) => state.inputPassword;
export const selectInputConfirmPassword = (state) =>
	state.setInputConfirmPassword;
// export const selectLoginStatus = (state) => state.login.status;
// export const selectLoginError = (state) => state.login.error;

export default accountSlice.reducer;
