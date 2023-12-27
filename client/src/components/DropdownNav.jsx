import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { Context } from "../context/ProviderCenter";
import "./styles/DropdownNav.css";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

const DropdownNav = () => {
    const { username } = useContext(Context);
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        let handleDropdown = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                // console.log(menuRef.current);
            }
        };

        document.addEventListener("mousedown", handleDropdown);

        return () => {
            document.removeEventListener("mousedown", handleDropdown);
        };
    });

    const handleLinkClick = () => {
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            await axios.post(`http://localhost:5500/api/logout`, null, {
                withCredentials: true,
            });
            window.location.reload();
            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className='navbar-dropdown-component' ref={menuRef}>
            <section
                onClick={() => {
                    setOpen(!open);
                }}
            >
                <label className='text-dropdown'>
                    {username}
                    <RiArrowDropDownLine className='dropdown-icon' />
                </label>
            </section>

            <section
                className={`dropdown-menu ${open ? "active" : "inactive"}`}
            >
                <ul className='dropdown-group'>
                    <Link
                        className='list-dropdown-link'
                        onClick={handleLinkClick}
                        to={"/account/edit-profile"}
                    >
                        <IoPersonCircleOutline />
                        Account
                    </Link>
                    <hr className='line-list-dropdown-link' />
                    <Link
                        className='list-dropdown-link'
                        onClick={handleLinkClick}
                        to={"/profile"}
                    >
                        <IoBagHandleOutline />
                        My Purchase
                    </Link>
                    <hr className='line-list-dropdown-link' />
                    <Link
                        className='list-dropdown-link'
                        onClick={handleLogout}
                        to={"/"}
                    >
                        <IoLogOutOutline />
                        Logout
                    </Link>
                </ul>
            </section>
        </div>
    );
};

export default DropdownNav;
