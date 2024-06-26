import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { IoBagHandleOutline } from 'react-icons/io5';
import { IoLogOutOutline } from 'react-icons/io5';

import { logoutUser, setUser } from '../libs/auth/authSlice';
import './styles/DropdownNav.css';

const DropdownNav = () => {
	const { t } = useTranslation();
	const menuRef = useRef();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const [openDropdown, setOpenDropdown] = useState(false);


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

	const handleLogout = async() => {
		dispatch(logoutUser());
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
					<img
						src={user?.payload?.avatar_image}
						alt='avatar'
						className='nav-avatar'
					/>
					<div className='nav-user-details'>
						{user?.payload?.username}
						<RiArrowDropDownLine className='dropdown-icon' />
					</div>
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
						to={`/account/overview`}>
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
