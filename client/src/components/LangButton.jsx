import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { IoGlobeOutline } from 'react-icons/io5';

import thIcon from '../assets/images/icons/th.png';
import ukIcon from '../assets//images/icons/uk.png';
import i18n from '../services/i18n';
import './styles/LangButton.css';
import Modal from 'react-modal';

const LangButton = () => {
	const { t } = useTranslation();
	const langRef = useRef();
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
	const [modalLangIsOpen, setModalLangIsOpen] = useState(false);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setCurrentLanguage(lng);

		setModalLangIsOpen(false);
	};

	// eslint-disable-next-line no-unused-vars
	function modalLangOpen() {
		setModalLangIsOpen(true);
		console.log();
	}

	// eslint-disable-next-line no-unused-vars
	function closeLangModal() {
		setModalLangIsOpen(false);
	}

	useEffect(() => {
		if (modalLangIsOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});

	useEffect(() => {
		const languageInLocalStorage = localStorage.getItem('language');

		if (languageInLocalStorage && languageInLocalStorage == i18n.language) {
			changeLanguage(languageInLocalStorage);
		}
	}, []);

	return (
		<div>
			<main
				className='change-lang-layout'
				ref={langRef}>
				<button
					className='button-change-lang'
					onClick={() => {
						setModalLangIsOpen(!modalLangIsOpen);
					}}>
					<IoGlobeOutline />
					<label
						className='label-current-language'
						htmlFor='button-change-lang'>
						{currentLanguage === 'th-TH' ? t('thai') : t('english')}
					</label>
				</button>
				<Modal
					isOpen={modalLangIsOpen}
					onRequestClose={closeLangModal}
					className='modalLang first-two'
					overlayClassName='Overlay'>
					<button
						className='btn-close-modal'
						onClick={closeLangModal}>
						&times;
					</button>
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
				</Modal>
			</main>
		</div>
	);
};

export default LangButton;
