import { Link } from "react-router-dom";
import { useState } from "react";
import "./styles/Sidebar.css";

const Sidebar = () => {
    const [selectedLink] = useState(location.pathname);

    return (
        <main className='profile-sec-ops'>
            <nav className='profile-option'>
                <Link
                    to={"/account/edit-profile"}
                    className={`profile-each-option ${
                        selectedLink === `/account/edit-profile`
                            ? "selected"
                            : ""
                    }`}
                >
                    <b>Profile</b>
                </Link>
                <hr className='profile-line' />
                <Link
                    to={"/account/security"}
                    className={`profile-each-option ${
                        selectedLink === `/account/security` ? "selected" : ""
                    }`}
                >
                    <b>Security</b>
                </Link>
                <hr className='profile-line' />
                <Link
                    to={"/account/address"}
                    className={`profile-each-option ${
                        selectedLink === `/account/address` ? "selected" : ""
                    }`}
                >
                    <b>Address</b>
                </Link>
                <hr className='profile-line' />
                <Link
                    to={"/account/payment"}
                    className={`profile-each-option ${
                        selectedLink === `/account/payment` ? "selected" : ""
                    }`}
                >
                    <b>Payment</b>
                </Link>
                <hr className='profile-line' />
            </nav>
        </main>
    );
};

export default Sidebar;
