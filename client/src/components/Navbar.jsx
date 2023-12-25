import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/Provider";
import "./styles/Navbar.css";
import DropdownNav from "./DropdownNav";
import { TailSpin } from "react-loader-spinner";

const Navbar = () => {
    const { loading, data } = useContext(Context);

    return (
        <nav className='navbar-component'>
            <section className='navbar-menu'>
                <Link to='/dash' className='each-menu'>
                    Dashboard
                </Link>

                <Link to='/chat' className='each-menu'>
                    Chat
                </Link>
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
                    <Link to='/' className='link-login'>
                        Login
                    </Link>
                )}
            </section>
        </nav>
    );
};

export default Navbar;
