import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../context/ProviderCenter";
import "./styles/Navbar.css";
import DropdownNav from "./DropdownNav";
import { TailSpin } from "react-loader-spinner";
import Login from "../pages/Login";

const Navbar = () => {
    const { loading, data } = useContext(Context);
    const [modalIsOpen, setIsOpen] = useState(false);

    // eslint-disable-next-line no-unused-vars
    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }

    // eslint-disable-next-line no-unused-vars
    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = "auto";
    }

    return (
        <nav className='navbar-component'>
            <main className='navbar-container'>
                <section className='navbar-menu'>
                    <Link to={"/"} className='each-menu'>
                        Dashboard
                    </Link>

                    <Link to={"/chat"} className='each-menu'>
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
                        <button
                            onClick={() => setIsOpen(true)}
                            className='link-login'
                        >
                            Login
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
