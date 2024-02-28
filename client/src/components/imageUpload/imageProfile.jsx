import { createRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useRef } from 'react';

import './styles/ImageProfile.css';

const ImageProfile = (props) => {
    const [image, setImage] = useState();
    const inputFileRef = createRef();
    const cleanup = () => {
        URL.revokeObjectURL(image && props.image)
        inputFileRef.current.value = null
    }

	const handleUpload = (e) => {
		console.log(URL.createObjectURL(e.target.files[0]));
		setImage(URL.createObjectURL(e.target.files[0]));
	};

	return (
		<div>
			{image ? (
				<div className='image-upload-profile-component'>
					<img
						className='image-profile-upload'
						src={image}
					/>
					<div>
						<label htmlFor='upload-photo-instead'>
							Change Photo
						</label>
						<input
							id='upload-photo-instead'
							type='file'
							onChange={handleUpload}
						/>
					</div>
				</div>
			) : (
				<section className='upload-photo-layer'>
					<label
						htmlFor='upload-photo'
						className='edit-profile-photo'>
						<FaUpload />
						Upload Photo
					</label>
					<input
						id='upload-photo'
						type='file'
						onChange={handleUpload}
					/>
				</section>
			)}
		</div>
	);
};

export default ImageProfile;
