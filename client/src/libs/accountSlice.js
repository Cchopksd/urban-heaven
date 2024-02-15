import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { URL_GET_USER_DATA, URL_GET_USER_ADDRESS } from '../api/userAPI';

const initialState = {
	user: null,
	address: null,
	status: 'idle',
	error: null,
	isEditAccount: false,
	value: null,
};

export const getUserData = createAsyncThunk('account/getData', async () => {
	try {
		const response = await axios.get(URL_GET_USER_DATA, {
			withCredentials: true,
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
			const response = await axios.get(URL_GET_USER_ADDRESS, {
				withCredentials: true,
			});
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
		clearUser: (state) => {
			state.user = null;
		},
		editProfile: (state, action) => {
			state.isEditAccount = action.payload;
		},
		updateValue: (state, action) => {
			state.value = action.payload;
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

export const { clearUser, editProfile, updateValue } = accountSlice.actions;

// Selectors
// export const selectEdit = (state) => state.account.isEditAccount;
// export const selectLoginStatus = (state) => state.login.status;
// export const selectLoginError = (state) => state.login.error;

export default accountSlice.reducer;
