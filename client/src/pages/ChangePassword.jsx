import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./styles/ChangePassword.css";

const ChangePassword = () => {
    return (
        <div className='change-password-screen'>
            <Navbar />
            <main className='profile-container'>
                <Sidebar />
                <section className='profile-sec-content'></section>
            </main>
            <Footer />
        </div>
    );
};

export default ChangePassword;
