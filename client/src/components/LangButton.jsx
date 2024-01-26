import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IoGlobeOutline } from 'react-icons/io5';

import thIcon from '../assets/images/icons/th.png';
import ukIcon from '../assets//images/icons/uk.png';
import i18n from '../services/i18n';
import './styles/LangButton.css';

const LangButton = () => {
	const { t } = useTranslation();
	const langRef = useRef();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
	const [langDropdown, setLangDropdown] = useState(false);
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setCurrentLanguage(lng);
		setLangDropdown(false);
	};

	useEffect(() => {
		const languageInLocalStorage = localStorage.getItem('language');

		if (languageInLocalStorage && languageInLocalStorage == i18n.language) {
			changeLanguage(languageInLocalStorage);
		}
	}, []);

	useEffect(() => {
		const handleDropdown = (e) => {
			if (!langRef.current.contains(e.target)) {
				setLangDropdown(false);
				// console.log(menuRef.current);
			}
		};

		document.addEventListener('mousedown', handleDropdown);

		return () => {
			document.removeEventListener('mousedown', handleDropdown);
		};
	});

	return (
		<div>
			<main
				className='change-lang-layout'
				ref={langRef}>
				<button
					className='button-change-lang'
					onClick={() => {
						setLangDropdown(!langDropdown);
					}}>
					<IoGlobeOutline />
					<label
						className='label-current-language'
						htmlFor='button-change-lang'>
						{currentLanguage === 'th-TH' ? t('thai') : t('english')}
					</label>
				</button>
				<section
					className={`dropdown-menu-lang ${
						langDropdown ? 'activeLang' : 'inactiveLang'
					}`}>
					<ul className='list-dropdown-button'>
						<button
							className={`button-lang ${
								currentLanguage === 'th-TH'
									? 'selectedLang'
									: ''
							}`}
							onClick={() => changeLanguage('th-TH')}>
							<img
								className='icon-flag'
								src={thIcon}
								alt='TH Flags'
							/>
							<span className='label-lang'>{t('thai')}</span>
						</button>

						<button
							className={`button-lang ${
								currentLanguage !== 'th-TH'
									? 'selectedLang'
									: ''
							}`}
							onClick={() => changeLanguage('en-US')}>
							<img
								className='icon-flag'
								src={ukIcon}
								alt='UK Flag'
							/>
							{t('english')}
						</button>
					</ul>
				</section>
			</main>
		</div>
	);
};

export default LangButton;
