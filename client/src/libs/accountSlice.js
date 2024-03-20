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
	URL_GET_PROVINCE,
	URL_GET_DISTRICT,
	URL_GET_SUBDISTRICT,
	URL_CREATE_ADDRESS,
} from '../api/userAPI';
import { getAuthUser, getRefreshToken } from './auth/authSlice';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const initialState = {
	user: null,
	address: null,
	status: 'idle',
	error: null,
	securityValue: {
		password: '',
		confirmPassword: '',
	},
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
	increaseAddressValue: {
		province: '',
		district: '',
		subdistrict: '',
		postal_code: '',
		address_line_1: '',
		address_line_2: '',
		address_label: '',
		address_default: '',
	},
	getProvinceData: {
		province: [],
		district: [],
		subdistrict: [],
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
			console.log(err.response.data.message);
			return err.response.data.message;
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
			return response?.data?.is_vendor_agreement;
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
			const accessToken = Cookies.get('accessToken');

			if (accessToken === undefined) {
				try {
					dispatch(getRefreshToken());
				} catch (error) {
					console.error('Error decoding access token:', error);
				}
			} else {
				const decodedAccessToken = await jwtDecode(accessToken);
				if (decodedAccessToken.exp < Date.now() / 1000) {
					dispatch(getRefreshToken());
				}
			}

			const formData = new FormData();
			formData.append('first_name', updateProfileValue.first_name);
			formData.append('last_name', updateProfileValue.last_name);
			formData.append('phone', updateProfileValue.phone);
			formData.append('gender', updateProfileValue.gender);
			formData.append('date', updateProfileValue.date);
			formData.append('month', updateProfileValue.month);
			formData.append('year', updateProfileValue.year);
			formData.append('avatar', updateProfileValue.avatar_image);
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
			dispatch(getUserData());
			dispatch(getAuthUser());
			return response.data;
		} catch (err) {
			console.log(err);
			return err.response.data;
		}
	},
);

export const getProvinceAPI = createAsyncThunk(
	'account/getProvinceAPI',
	async () => {
		try {
			const response = await axios.get(URL_GET_PROVINCE, {
				withCredentials: true,
			});
			return response.data.payload;
		} catch (err) {
			throw new Error();
		}
	},
);

export const getDistrictAPI = createAsyncThunk(
	'account/getDistrictAPI',
	async (_, { getState }) => {
		try {
			const { province } = getState().account.increaseAddressValue;
			const response = await axios.get(URL_GET_DISTRICT(province), {
				withCredentials: true,
			});
			return response.data.payload;
		} catch (err) {
			throw new Error();
		}
	},
);

export const getSubdistrictAPI = createAsyncThunk(
	'account/getSubdistrictAPI',
	async (_, { getState }) => {
		try {
			const { increaseAddressValue } = getState().account;
			const response = await axios.get(
				URL_GET_SUBDISTRICT(increaseAddressValue.district),
				{
					withCredentials: true,
				},
			);
			return response.data.payload;
		} catch (err) {
			throw new Error();
		}
	},
);

export const createAddress = createAsyncThunk(
	'account/createAddress',
	async ({ increaseAddressValue }) => {
		try {
			console.log(increaseAddressValue);
			const accessToken = Cookies.get('accessToken');
			const response = await axios.post(
				URL_CREATE_ADDRESS,
				increaseAddressValue,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);
			return response.data;
		} catch (err) {
			throw new err();
		}
	},
);

export const resetPassword = createAsyncThunk(
	'account/resetPassword',
	async ({ securityValue }) => {
		const { password } = securityValue;
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
			await Swal.fire({
				title: 'Success',
				text: 'Password has changed',
				icon: 'success',
			});
			return response.data;
		} catch (err) {
			console.log(err.response.data.message);
			await Swal.fire({
				title: 'Error',
				text: err.response.message,
				icon: 'error',
			});
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
		updatePassword: (state, action) => {
			state.securityValue = {
				...state.securityValue,
				...action.payload,
			};
		},
		increaseAddress: (state, action) => {
			state.increaseAddressValue = {
				...state.increaseAddressValue,
				...action.payload,
			};
		},
		getPostID: (state, action) => {
			state.increaseAddressValue.postal_code = action.payload;
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
			})
			.addCase(resetPassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(resetPassword.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getProvinceAPI.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getProvinceAPI.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.getProvinceData.province = action.payload;
			})
			.addCase(getProvinceAPI.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getDistrictAPI.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getDistrictAPI.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.getProvinceData.district = action.payload;
			})
			.addCase(getDistrictAPI.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(getSubdistrictAPI.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getSubdistrictAPI.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.getProvinceData.subdistrict = action.payload;
			})
			.addCase(getSubdistrictAPI.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createAddress.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createAddress.fulfilled, (state) => {
				state.status = 'succeeded';
			})
			.addCase(createAddress.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const {
	clearUser,
	editProfile,
	updateProfile,
	updatePassword,
	increaseAddress,
	getPostID,
} = accountSlice.actions;

// Selectors

// export const selectLoginStatus = (state) => state.login.status;
// export const selectLoginError = (state) => state.login.error;

export default accountSlice.reducer;
