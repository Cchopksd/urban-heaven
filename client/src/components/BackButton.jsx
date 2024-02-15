import { IoChevronBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import './styles/BackButton.css'

const BackButton = () => {
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(-1);
	};
	return (
		<section className='back-button-container'>
			<label htmlFor='back'>
				<section
					className='back-button'
					onClick={handleBack}>
					<IoChevronBackOutline className='back-icon' />
					<span className='back-text'>{('back')}</span>
				</section>
			</label>
		</section>
	);
};

export default BackButton;
