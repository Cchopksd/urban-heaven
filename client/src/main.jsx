import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import App from './Routes.jsx';
import './index.css';
import { Provider } from './context/Provider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider>
		<I18nextProvider i18n={i18n}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</I18nextProvider>
	</Provider>,
);
