import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { Link, useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IoBagHandleOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

import { Context } from '../context/Provider';
import './styles/DropdownNav.css';

const DropdownNav = () => {
	const { t } = useTranslation();
	const { data } = useContext(Context);
	const [openDropdown, setOpenDropdown] = useState(false);
	const menuRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		let handleDropdown = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setOpenDropdown(false);
				// console.log(menuRef.current);
			}
		};

		document.addEventListener('mousedown', handleDropdown);

		return () => {
			document.removeEventListener('mousedown', handleDropdown);
		};
	});

	const handleLinkClick = () => {
		setOpenDropdown(false);
	};

	const handleLogout = async () => {
		try {
			await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`, null, {
				withCredentials: true,
			});
			window.location.reload();
			navigate('/');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<div
			className='navbar-dropdown-component'
			ref={menuRef}>
			<section
				onClick={() => {
					setOpenDropdown(!openDropdown);
				}}>
				<label className='text-dropdown'>
					{data.username}
					<RiArrowDropDownLine className='dropdown-icon' />
				</label>
			</section>

			<section
				className={`dropdown-menu ${
					openDropdown ? 'active' : 'inactive'
				}`}>
				<ul className='dropdown-group'>
					<Link
						className='list-dropdown-link'
						onClick={handleLinkClick}
						to={'/account/edit-profile'}>
						<IoPersonCircleOutline />
						{t('account')}
					</Link>
					<hr className='line-list-dropdown-link' />
					<Link
						className='list-dropdown-link'
						onClick={handleLinkClick}
						to={'/my-purchase'}>
						<IoBagHandleOutline />
						{t('purchase')}
					</Link>
					<hr className='line-list-dropdown-link' />
					<Link
						className='list-dropdown-link'
						onClick={handleLogout}
						to={'/'}>
						<IoLogOutOutline />
						{t('logout')}
					</Link>
				</ul>
			</section>
		</div>
	);
};

export default DropdownNav;
