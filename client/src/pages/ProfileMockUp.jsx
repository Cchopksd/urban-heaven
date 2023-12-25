import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/profile.css";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    return (
        <div className='profile-screen'>
            <Navbar />
            <main className='profile-container'>
                <Sidebar />
                <section className='profile-sec-content'>
                    
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
