import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
// import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './features/auth/authSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
	reducer: { auth: persistedAuthReducer },
	// middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
