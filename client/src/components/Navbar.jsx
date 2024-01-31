import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { IoCartOutline } from 'react-icons/io5';

import LangButton from './LangButton';
import DropdownNav from './DropdownNav';
import Login from '../pages/Login';
import './styles/Navbar.css';

const Navbar = () => {
	const { t } = useTranslation();
	const { user, status } = useSelector((state) => state.auth);

	const menuHamRef = useRef();
	// const { config, loading } = useContext(Context);
	const [modalIsOpen, setIsOpen] = useState(false);

	const [isMenuOpen, setMenuOpen] = useState(false);

	// eslint-disable-next-line no-unused-vars
	function openModal() {
		setIsOpen(true);
	}

	// eslint-disable-next-line no-unused-vars
	function closeModal() {
		setIsOpen(false);
	}

	useEffect(() => {
		const handleMenu = (e) => {
			if (!menuHamRef.current.contains(e.target)) {
				setMenuOpen(false);
				// console.log(menuHamRef.current);
			}
		};

		document.addEventListener('mousedown', handleMenu);

		return () => {
			document.removeEventListener('mousedown', handleMenu);
		};
	});

	return (
		<nav className='navbar-component'>
			<main className='navbar-container'>
				<section
					className='navbar-hide'
					ref={menuHamRef}>
					<button
						className='menu-icon'
						onClick={() => {
							setMenuOpen(!isMenuOpen);
						}}>
						☰
					</button>

					<section
						className={`nav-sec-1 ${
							isMenuOpen ? 'nav-slide' : ''
						}`}>
						<h1 className='nav-logo'>
							<Link
								to={'/'}
								className='each-menu'>
								URBAN-HAVEN
							</Link>
						</h1>
						<h1 className='nav-logo'>|</h1>

						<LangButton className='each-menu' />

						<Link
							to={'/'}
							className={`nav-menu-home ${
								isMenuOpen ? 'each-menu nav-reveal' : ''
							}`}>
							<IoCartOutline className='hide' />
							Home
						</Link>

						<Link
							to={'chat'}
							className='each-menu'>
							<IoCartOutline className='hide' />
							Cart
						</Link>
					</section>
				</section>

				<section className='navbar-dropdown'>
					{status === 'loading' ? (
						<section className='loader'>
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
						</section>
					) : user  ? (
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
