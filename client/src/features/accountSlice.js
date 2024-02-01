import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';
import { URL_GET_USER_DATA } from '../api/userAPI';

const initialState = {
	user: null,
	status: 'idle',
	error: null,
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

const accountSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
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
			});
	},
});

// export const {} = userSlice.actions

export default accountSlice.reducer;
