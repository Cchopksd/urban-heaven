import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';

import { updateProfile } from '../../libs/accountSlice';
import './styles/ImageProfile.css';

const ImageProfile = () => {
	const dispatch = useDispatch();
	// const { t } = useTranslation();
	const { updateProfileValue } = useSelector((state) => state.account);

	const [image, setImage] = useState(null);

	const handleSelectFile = async (field, value) => {
		setImage(URL.createObjectURL(value));
		dispatch(updateProfile({ [field]: value }));
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const droppedFiles = e.dataTransfer.files;
		if (droppedFiles.length > 0) {
			handleSelectFile('avatar', {
				target: { files: [droppedFiles[0]] },
			});
		}
	};

	const handleImageClick = () => {
		document.getElementById('upload-photo-instead').click();
	};



	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}>
			<div className='image-upload-profile-component'>
				<img
					className='image-profile-upload'
					src={image ? image : updateProfileValue.avatar_image}
					alt='Uploaded Avatar'
					onClick={handleImageClick}
				/>
				<label
					htmlFor='upload-photo-instead'
					className='edit-profile-photo-instead'>
					Change Photo
				</label>
				<input
					id='upload-photo-instead'
					type='file'
					accept='image/*'
					multiple={false}
					onChange={(e) =>
						handleSelectFile('avatar_image', e.target.files[0])
					}
				/>
			</div>
		</div>
	);
};

export default ImageProfile;
