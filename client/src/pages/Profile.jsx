import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/profile.css";

const Profile = () => {
    return (
        <div className='profile-screen'>
            <Navbar />
            <main className='profile-container'>
                <section className='profile-sec-ops'>
                    <ul className='profile-option'>
                        <li className=''>
                            <Link>
                                <b>Edit profile</b>
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <b>Change password</b>
                            </Link>
                        </li>
                    </ul>
                </section>
                <section></section>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
