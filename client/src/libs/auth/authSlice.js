import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

import { URL_LOGIN, URL_GET_AUTH_DATA, URL_LOGOUT } from '../../api/userAPI';

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
			console.log(response.data);
			if (response.data.message === 'Login Successfully') {
				dispatch(getAuthUser());
			} else {
				throw new Error(response.data.message);
			}
			Swal.fire({
				title: 'Message',
				text: response.data.message,
				icon: 'success',
			});
			Cookies.set('accessToken', response.data.token.accessToken);
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
		console.log(accessToken);
		const response = await axios.get(URL_GET_AUTH_DATA, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		sessionStorage.setItem(
			'user-data',
			JSON.stringify(response.data),
			console.log(response)
		);
		// if (response.data.config.payload.role === 'admin') {
		// 	navigate('/admin');
		// }
		// if(response.data.)
		console.log(response.data);
		return response.data;
	} catch (err) {
		console.error('Logout failed:', err);
		return err.response?.data;
	}
});

export const logoutUser = createAsyncThunk(
	'auth/logoutUser',
	async (_, { dispatch }) => {
		try {
			const response = await axios.post(URL_LOGOUT, null, {
				withCredentials: true,
			});
			sessionStorage.removeItem('user-data');
			dispatch(clearUser());
			console.log('logout');
			return response?.data;
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
