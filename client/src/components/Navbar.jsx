import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <ul>
                <li><Link to='/chat'>chat</Link></li>
                <li><Link to='/dash'>Dash</Link></li>
                <li><Link to='/'>Login</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;
