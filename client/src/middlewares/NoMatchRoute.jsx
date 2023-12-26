import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './styles/NoMatch.css'

const NoMatchRoute = () => {
    return (
        <div className='no-screen'>
            <Navbar />
            <main className='no-container '>
                <h1>404 | This page could not be found.</h1>
            </main>
            <Footer />
        </div>
    );
}

export default NoMatchRoute;
