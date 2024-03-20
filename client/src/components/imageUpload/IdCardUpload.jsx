import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { FaUpload } from 'react-icons/fa';

import { createShop } from '../../libs/merchantSlice';

const IdCardUpload = () => {
	const dispatch = useDispatch();
	const { createShopValue } = useSelector((state) => state.merchant);
	const [card, setCard] = useState(null);

	const handleSelectFile = async (field, value) => {
		try {
			setCard(URL.createObjectURL(value));
			dispatch(createShop({ [field]: value }));
		} catch (error) {
			console.error('Error creating object URL:', error);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFiles = e.dataTransfer.files[0];

		handleSelectFile('id_card', droppedFiles);
	};

	const handleImageClick = () => {
		document.getElementById('upload-id-card').click();
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			<p className='create-merchant-card-info'>รูปบัตรประชาชน :</p>
			<div
				className='create-merchant-image-upload-id-card-box'
				onClick={handleImageClick}>
				{card ? (
					<img
						className='create-merchant-image-upload-id-card'
						src={card}
						alt='Uploaded id-card'
					/>
				) : (
					<label
						className='image-empty'>
						<FaUpload />
						Drag & DROP
					</label>
				)}
                <input
                    
					id='upload-id-card'
					type='file'
					name='id_card'
					accept='image/*'
					multiple={false}
					onChange={(e) =>
						handleSelectFile('id_card', e.target.files[0])
					}
				/>
			</div>
		</div>
	);
};

export default IdCardUpload;
