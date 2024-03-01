import { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import axios from 'axios';

import './styles/ImageProfile.css';

const ImageProfile = (props) => {
	const [file, setFile] = useState(null);
	const [image, setImage] = useState();
	const [res, setRes] = useState({});
	const handleSelectFile = (e) => {
		setFile(e.target.files[0]);
		setImage(URL.createObjectURL(e.target.files[0]));
	};
	const handleUpload = async () => {
		try {
			const data = new FormData();
			data.append('avatar', file);
			const res = await axios.post(
				'http://localhost:5500/api/send-image',
				data,
			);
			setRes(res.data);
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<div>
			{file ? (
				<div className='image-upload-profile-component'>
					<img
						className='image-profile-upload'
						src={image}
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
						onChange={handleSelectFile}
					/>
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
						accept='image/*'
						onChange={handleSelectFile}
						multiple={false}
					/>
				</section>
			)}
		</div>
	);
};

export default ImageProfile;
