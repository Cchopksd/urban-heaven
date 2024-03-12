import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { useSelector } from 'react-redux';
// import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './libs/auth/authSlice';
import accountSlice from './libs/accountSlice';
import vendorSlice from './libs/vendorSlice';
import { useEffect } from 'react';

const persistConfig = {
	key: 'user',
	storage,
	whitelist: ['user'],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = {
	auth: persistedAuthReducer,
	account: accountSlice,
	vendor: vendorSlice,
};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	devTools: import.meta.env.APP_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
