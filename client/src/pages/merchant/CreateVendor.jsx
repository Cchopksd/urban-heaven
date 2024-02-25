import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import './styles/CreateVendor.css';

const CreateVendor = () => {
	return (
		<div className='create-vendor-screen'>
			<Navbar />
			<main className='create-vendor-main'>
				<section className='create-vendor-content-layout'>
					<section className='create-vendor-content'>
						<section className='create-vendor-content-header'>
							<BackButton />
							<h1 className='create-vendor-text-header'>
								Create vendor
							</h1>
						</section>
						<hr className='create-vendor-line' />
						<section className='create-vendor-content-body'>
							<label>
								ชื่อร้านค้า : <input type='text' />
							</label>
							<label>
								อีเมลติดต่อ : <input type='text' />
							</label>
							<label>
								เบอร์ติดต่อ : <input type='text' />
							</label>
							<label>
								ที่อยู่ร้านค้า : <textarea id="story" name="story" rows="5" cols="33"></textarea>
							</label>
							<section>
								Payment Method :
								<label>
									<input
										type='checkbox'
										name=''
										id=''
									/>
									PromptPay
								</label>
								<label>
									<input
										type='checkbox'
										name=''
										id=''
									/>
									Mobile Banking
								</label>
								<section>

								</section>
								<label>
									<input
										type='checkbox'
										name=''
										id=''
									/>
									Cards
								</label>
								<label>
									<input
										type='checkbox'
										name=''
										id=''
									/>
									Cash on delivery
								</label>
							</section>
							<label htmlFor=''>
								Personal ID:
								<input
									type='text'
									maxLength={13}
								/>
							</label>
							<label>
								Taxpayer Identification No :
								<input type='text' />
							</label>
							<label>
								รูปคุ่ถ่ายกับบัตรประชาชน
								<input
									id='upload-photo'
									type='file'
								/>
								upload image
							</label>
						</section>
					</section>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default CreateVendor;
