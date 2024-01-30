import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const URL_LOGIN = `${import.meta.env.VITE_BASE_URL}/login`;
const URL_LOGOUT = `${import.meta.env.VITE_BASE_URL}/logout`;

const initialState = {
	user: null,
	status: 'idle',
	error: null,
};

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password, closeModal }) => {
		try {
			const response = await axios.post(
				URL_LOGIN,
				{ email, password },
				{
					withCredentials: true,
				},
			);
			sessionStorage.setItem(
				'user-data',
				JSON.stringify(response.data.payload),
			);
			closeModal();
			await Swal.fire({
				title: 'Message',
				text: response.data.message,
				icon: 'success',
			});
			return response.data;
		} catch (error) {
			throw error.response.data;
		}
	},
);

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
		clearUser: (state) => {
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logoutUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'idle';
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
