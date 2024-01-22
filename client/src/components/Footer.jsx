import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok } from 'react-icons/io5';

import './styles/Footer.css';

const Footer = () => {
	const { t } = useTranslation();
	return (
		<footer className='footer-component'>
			<section className='footer-sec-1'>
				<h1>Urban-Heaven</h1>
				<p>{t('solution')}</p>
			</section>
			<section className='footer-sec-2'>
				<h4>{t('company')}</h4>
				<p>
					<Link
						to={'#'}
						className='footer-link'>
						{t('aboutUS')}
					</Link>
				</p>
				<p>
					<Link
						to={'#'}
						className='footer-link'>
						{t('service')}
					</Link>
				</p>
				<p>
					<Link
						to={'#'}
						className='footer-link'>
						{t('joinWithUS')}
					</Link>
				</p>
			</section>
			<section className='footer-sec-3'>
				<h4>{t('support')}</h4>

				<p>
					<Link
						to={'#'}
						className='footer-link'>
						User agreement
					</Link>
				</p>
				<p>
					<Link
						to={'#'}
						className='footer-link'>
						Privacy policy
					</Link>
				</p>
				<p>
					<Link
						to={'#'}
						className='footer-link'>
						FAQs
					</Link>
				</p>
			</section>
			<section className='footer-sec-4'>
				<h4>Contact us</h4>
				<label>
					<Link
						className='footer-mail'
						to='#'
						onClick={(e) => {
							window.location.href =
								'mailto:no-reply@example.com';
							e.preventDefault();
						}}>
						example@mail.com
					</Link>
				</label>
				<h4>Community</h4>
				<section className='footer-sec-4-commu'>
					<Link
						className='footer-link'
						to={'https://www.facebook.com/'}>
						<IoLogoFacebook />
					</Link>
					<Link
						className='footer-link'
						to={'https://www.instagram.com/'}>
						<IoLogoInstagram />
					</Link>
					<Link
						className='footer-link'
						to={'https://www.tiktok.com/'}>
						<IoLogoTiktok />
					</Link>
				</section>
			</section>
		</footer>
	);
};

export default Footer;
