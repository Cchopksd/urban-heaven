import { Link } from "react-router-dom";
import './styles/Sidebar.css'

const Sidebar = () => {
    return (
        <main className='profile-sec-ops'>
            <nav className='profile-option'>
                <Link
                    to={"/account/edit-profile"}
                    className='profile-each-option'
                >
                    <b>Edit profile</b>
                </Link>
                <hr className='profile-line' />
                <Link
                    to={"/account/change-password"}
                    className='profile-each-option'
                >
                    <b>Change password</b>
                </Link>
                <hr className='profile-line' />
                <Link className='profile-each-option'>
                    <b>Address</b>
                </Link>
                <hr className='profile-line' />
            </nav>
        </main>
    );
};

export default Sidebar;
