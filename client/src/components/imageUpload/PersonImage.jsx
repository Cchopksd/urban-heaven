import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { createShop } from '../../libs/merchantSlice';
import { FaUpload } from 'react-icons/fa';

const PersonImage = () => {
	const dispatch = useDispatch();
	const { createShopValue } = useSelector((state) => state.merchant);
	const [person, setPerson] = useState(null);

    const handleSelectFile = async (field, value) => {
		try {
			setPerson(URL.createObjectURL(value));
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
		if (droppedFiles) {
			handleSelectFile('person_image', droppedFiles);
		}
	};

	const handleImageClick = () => {
		document.getElementById('upload-person-image').click();
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			<p>รูปคู่กับบัครประชาชน :</p>
			<div
				className='create-merchant-image-upload-id-card-box'
				onClick={handleImageClick}>
				{person ? (
					<img
						className='create-merchant-image-upload-id-card'
						src={person}
						alt='Uploaded id-card'
					/>
				) : (
					<label
						htmlFor='upload-person-image'
						className='image-empty'>
						<FaUpload />
						Drag & DROP
					</label>
				)}
				<input
					id='upload-person-image'
					type='file'
					name='person_image'
					accept='image/*'
					multiple={false}
					onChange={(e) =>
						handleSelectFile('person_image', e.target.files[0])
					}
				/>
			</div>
		</div>
	);
};

export default PersonImage;
