import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

// import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './libs/auth/authSlice';
import accountSlice from './libs/accountSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const rootReducer = {
	auth: persistedAuthReducer,
	account: accountSlice,
};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export { store, persistor };
