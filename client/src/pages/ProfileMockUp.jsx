import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./styles/profile.css";
import Sidebar from "../components/Sidebar";

const Profile = () => {
    return (
        <div className='profile-screen'>
            <Navbar />
            <main className='profile-layout'>
                <Sidebar className="sidebar_pro"/>
                <section className='profile-sec-content'>
                    <p>profile</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
