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
                    to={"/account/change-password"}
                    className={`profile-each-option ${
                        selectedLink === `/account/change-password`
                            ? "selected"
                            : ""
                    }`}
                >
                    <b>Change password</b>
                </Link>
                <hr className='profile-line' />
                <Link
                    to={"/account/address"}
                    className={`profile-each-option ${
                        selectedLink === `/account/address`
                        ? "selected"
                        : ""
                    }`}
                >
                    <b>Address</b>
                </Link>
                <hr className='profile-line' />
            </nav>
        </main>
    );
};

export default Sidebar;
