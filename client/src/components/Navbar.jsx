import { Link } from "react-router-dom";
import { useContext } from "react";
import "./styles/Navbar.css";
import { Context } from "../context/Provider";

const Navbar = () => {
    const { user, loading, data, } = useContext(Context);

    return (
        <div className='navbar-component'>
            <ul className='navbar-menu'>
                <li className='list-menu'>
                    <Link to='/dash' className='each-menu'>
                        Dashboard
                    </Link>
                </li>
                <li className='list-menu'>
                    <Link to='/chat' className='each-menu'>
                        Chat
                    </Link>
                </li>
            </ul>
            {loading ? (
                <p>loading...</p>
            ) : data ? (
                <span>{user}</span>
            ) : (
                <Link to='/' className='link-login'>
                    Login
                </Link>
            )}
        </div>
    );
};

export default Navbar;
