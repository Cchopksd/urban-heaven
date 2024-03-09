import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './styles/BackButton.css';
const BackButton = ({ step }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const handleBack = () => {
		if (step !== undefined) {
			navigate(step);
		} else {
			navigate(-1);
		}
	};
	return (
		<section className='back-button-container'>
			<label htmlFor='back'>
				<section
					className='back-button'
					onClick={handleBack}>
					<IoChevronBackOutline className='back-icon' />
					<span className='back-text'>{t('back')}</span>
				</section>
			</label>
		</section>
	);
};

export default BackButton;
