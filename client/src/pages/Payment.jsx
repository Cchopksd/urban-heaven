import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./styles/Payment.css";

const Payment = () => {
    return (
        <div className='payment-screen'>
            <Navbar />
            <main className='payment-layout'>
                <Sidebar />
                <section className='payment-sec-content'>
                    <p>payment</p>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Payment;