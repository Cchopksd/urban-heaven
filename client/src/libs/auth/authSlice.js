import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import {
	URL_LOGIN,
	URL_GET_AUTH_DATA,
	URL_REFRESH_TOKEN,
	URL_VERIFY_EMAIL,
} from '../../api/userAPI';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
	isUserLoggedIn: false,
};

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password, closeModal, isChecked }, { dispatch }) => {
		try {
			const response = await axios.post(
				URL_LOGIN,
				{ email, password, isChecked },
				{
					withCredentials: true,
				},
			);
			closeModal();
			const expireTime = isChecked ? 2592000000 : 86400000;

			var currentDate = new Date();

			var expirationTime = new Date(currentDate.getTime() + expireTime);
			console.log(expirationTime);
			Cookies.set('accessToken', response.data?.token?.accessToken);
			Cookies.set('refreshToken', response.data?.token?.refreshToken, {
				expires: expirationTime,
			});
			if (response.data.message === 'Login Successfully') {
				dispatch(getAuthUser());
			} else {
				return Promise.reject(response.data.message);
			}
			Swal.fire({
				title: 'Message',
				text: response.data.message,
				icon: 'success',
			});
			return response.data;
		} catch (error) {
			await Swal.fire({
				title: 'Message',
				text: error.response.data.message,
				icon: 'error',
			});
			throw error;
		}
	},
);

export const getAuthUser = createAsyncThunk('auth/getAuthUser', async () => {
	try {
		const accessToken = Cookies.get('accessToken');
		if (!accessToken) {
			console.log('No access token found');
			return null;
		}
		const response = await axios.get(URL_GET_AUTH_DATA, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		sessionStorage.setItem('user-data', JSON.stringify(response.data));
		return response.data;
	} catch (err) {
		console.error('Logout failed:', err);
		return err.response?.data;
	}
});

export const getRefreshToken = createAsyncThunk(
	'auth/getRefreshToken',
	async () => {
		try {
			const refreshToken = Cookies.get('refreshToken');
			if (!refreshToken) {
				console.log('No access token found');
				return null;
			}
			const response = await axios.post(URL_REFRESH_TOKEN, null, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			});
			Cookies.set('accessToken', response.data?.token?.accessToken);
			return response.data;
		} catch (err) {
			console.error(err.message);
			return err.response?.data.message;
		}
	},
);

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, { dispatch }) => {
		try {
			sessionStorage.removeItem('user-data');
			Cookies.remove('accessToken');
			console.log('logout');
		} catch (error) {
			console.error('Logout failed:', error);
			return error.response?.data;
		}
	},
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		getRefreshToken: (state, action) => {
			state.user = action.payload;
		},
		verifyEmail: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.status = 'succeeded';
				state.isUserLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';

				state.error = action.error.message;
			})
			.addCase(getAuthUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getAuthUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(getAuthUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})

			.addCase(logoutUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'idle';
				state.isUserLoggedIn = false;
				state.user = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

// Exporting action creators
export const { setUser, clearUser } = authSlice.actions;

// Selectors
// export const selectLogin = (state) => state.login.login;
// export const selectLoginStatus = (state) => state.login.status;
// export const selectLoginError = (state) => state.login.error;

export default authSlice.reducer;
