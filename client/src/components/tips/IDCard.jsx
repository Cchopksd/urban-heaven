import { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import './styles/IDCard.css'

const IDCard = () => {
	const [modalIsOpen, setIsOpen] = useState(false);
	function openModal() {
		setIsOpen(true);
	}
	function closeModal() {
		setIsOpen(false);
	}

	return (
		<div className='IDCard-popup'>
			<FaInfoCircle
				className='info-icon'
				onClick={openModal}
			/>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className='Modal first-two'
				overlayClassName='Overlay'>
				<div>
					<h4>Example</h4>
				</div>
			</Modal>
		</div>
	);
};

export default IDCard;
