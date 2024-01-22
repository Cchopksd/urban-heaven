import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { IoCartOutline } from 'react-icons/io5';

import { Context } from '../context/Provider';
import DropdownNav from './DropdownNav';
import Login from '../pages/Login';
import './styles/Navbar.css';

const Navbar = () => {
	const { t } = useTranslation();
	const { loading, data } = useContext(Context);
	const [modalIsOpen, setIsOpen] = useState(false);

	// eslint-disable-next-line no-unused-vars
	function openModal() {
		setIsOpen(true);
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'scroll';
		};
	}

	// eslint-disable-next-line no-unused-vars
	function closeModal() {
		setIsOpen(false);
		document.body.style.overflow = 'auto';
	}

	return (
		<nav className='navbar-component'>
			<main className='navbar-container'>
				<section className='nav-sec-1'>
					<h1>
						<Link
							to={'/'}
							className='each-menu'>
							URBAN-HAVEN
						</Link>
					</h1>
					<h1>|</h1>
					<section className='navbar-menu'>
						<Link
							to={'/'}
							className='each-menu'>
							Home
						</Link>

						<Link
							to={'/chat'}
							className='each-menu'>
							<IoCartOutline className='hide' />
							Cart
						</Link>
					</section>
				</section>
				<section className='navbar-dropdown'>
					{loading ? (
						<TailSpin
							visible={true}
							height='20'
							width='20'
							color='#000000'
							ariaLabel='tail-spin-loading'
							radius='1'
							wrapperStyle={{}}
							wrapperClass=''
						/>
					) : data ? (
						<DropdownNav className='nav-drop' />
					) : (
						<button
							onClick={() => setIsOpen(true)}
							className='link-login'>
							{t('login')}
						</button>
					)}
					<Login
						modalIsOpen={modalIsOpen}
						closeModal={() => setIsOpen(false)}
					/>
				</section>
			</main>
		</nav>
	);
};

export default Navbar;
