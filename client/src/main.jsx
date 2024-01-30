import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { PersistGate } from 'redux-persist/integration/react';

import App from './Routes.jsx';
import './index.css';
// import { Provider } from './context/Provider.jsx';
import { store, persistor } from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<PersistGate
			loading={null}
			persistor={persistor}>
			<I18nextProvider i18n={i18n}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</I18nextProvider>
		</PersistGate>
	</Provider>,
);
