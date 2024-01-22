import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../services/i18n';

const App = () => {
	const { t } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setCurrentLanguage(lng);
	};
	useEffect(() => {
		const languageInLocalStorage = localStorage.getItem('language');
		if (
			languageInLocalStorage &&
			languageInLocalStorage !== i18n.language
		) {
			i18n.changeLanguage(languageInLocalStorage);
			setCurrentLanguage(languageInLocalStorage);
		}
	}, []);

	return (
		<div>
			<h1>{t('greeting')}</h1>
			<button onClick={() => changeLanguage('en')}>English</button>
			<button onClick={() => changeLanguage('th')}>ไทย</button>
			<p>{t('changeLanguage')}</p>
			<p>
				{t('currentLanguage')}: {currentLanguage}
			</p>
		</div>
	);
};

export default App;
