import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
    return (
        <footer className='footer-component'>
            <section className='contact-info'>
                <h2 className='contact-info-header'>Contact</h2>
                <address>
                    <p>
                        Email:info@example.com
                        <a href='mailto:info@example.com'>info@example.com</a>
                    </p>
                    <p>Phone: 123-456-7890</p>
                    <p>Address: 123 Sukhumvit Road, Bangkok</p>
                </address>
            </section>
            <section className='copyright'>
                <p>&copy; 2023 Example Company. All rights reserved.</p>
            </section>
            <section className='privacy-policy'>
                <p>
                    <Link href='/privacy-policy'>Privacy Policy</Link>
                </p>
            </section>
            <section className='social-media-links'>
                <h2>Follow Us</h2>
                <ul>
                    <li>
                        <Link
                            href='https://facebook.com/example'
                            target='blank'
                        >
                            Facebook
                        </Link>
                    </li>
                    <li>
                        <Link href='https://twitter.com/example' target='blank'>
                            Twitter
                        </Link>
                    </li>
                    <li>
                        <aLink
                            href='https://instagram.com/example'
                            target='blank'
                        >
                            Instagram
                        </aLink>
                    </li>
                </ul>
            </section>
        </footer>
    );
};

export default Footer;
