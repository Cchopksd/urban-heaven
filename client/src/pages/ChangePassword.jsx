import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./styles/ChangePassword.css";

const ChangePassword = () => {
    return (
        <div className='change-password-screen'>
            <Navbar />
            <main className='change-password-container'>
                <Sidebar />
                <section className='change-password-sec-content'>
                    <p>change-password</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ChangePassword;
