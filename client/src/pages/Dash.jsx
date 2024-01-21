import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import './styles/Dash.css'

const Dash = () => {
	return (
		<div>
			<Navbar />
			<Banner />
			<main >
				<h1 className='text-flash'>⚡Flash sale</h1>
			</main>
		</div>
	);
};

export default Dash;
