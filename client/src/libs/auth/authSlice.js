import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import {
	URL_LOGIN,
	URL_GET_AUTH_DATA,
	URL_REFRESH_TOKEN,
	URL_VERIFY_EMAIL,
	URL_SEND_EMAIL_VERIFY,
} from '../../api/userAPI';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
	isUserLoggedIn: false,
	emailVerify: null,
};

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password, closeModal, isChecked }, { dispatch }) => {
		// const navigate = useNavigate();

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
			Cookies.set('accessToken', response.data?.token?.accessToken, {
				secure: true,
				sameSite: 'strict',
				Priority: 'High',
			});
			Cookies.set('refreshToken', response.data?.token?.refreshToken, {
				expires: expirationTime,
				secure: true,
				sameSite: 'strict',
				Priority: 'High',
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
		sessionStorage.setItem(
			'user-data',
			JSON.stringify({
				payload: {
					user_uuid: response.data.payload.user_uuid,
					username: response.data.payload.username,
					role: response.data.payload.role,
					is_verified: response.data.payload.is_verified,
				},
			}),
		);
		// console.log(response.data.payload.is_verified);
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

export const sendEmailVerify = createAsyncThunk(
	'auth/sendEmailVerify',
	async () => {
		try {
			const accessToken = Cookies.get('accessToken');
			if (!accessToken) {
				console.log('No access token found');
				return null;
			}
			const response = await axios.post(URL_SEND_EMAIL_VERIFY, null, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
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
			.addCase(sendEmailVerify.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(sendEmailVerify.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.emailVerify = action.payload;
			})
			.addCase(sendEmailVerify.rejected, (state, action) => {
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
