import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/Banner.css';
import imageBanner1 from '../assets/images/banner1.jpg';
import imageBanner2 from '../assets/images/banner2.png';
import { Link } from 'react-router-dom';

export default function Banner() {
	const settings = {
		dots: true,
		useCSS: true,
		draggable: true,
		infinite: true,
		autoplay: true,
		speed: 300,
		pauseOnHover: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		cssEase: 'linear',
	};

	return (
		<div className='banner-component'>
			<main className='slider-container'>
				<Slider
					{...settings}
					className='slider'>
					<section className='slider-layout'>
						<Link to={'/mockup1'}>
							<img
								className='image-style'
								src={imageBanner1}
								alt='Slide 1'
							/>
						</Link>
					</section>

					<section className='slider-layout'>
						<Link to={'/mockup2'}>
							<img
								className='image-style'
								src={imageBanner2}
								alt='Slide 2'
							/>
						</Link>
					</section>
					<section className='slider-layout'>
						<Link to={'/mockup3'}>
							<img
								className='image-style'
								src={imageBanner1}
								alt='Slide 1'
							/>
						</Link>
					</section>
					<section className='slider-layout'>
						<Link to={'/mockup4'}>
							<img
								className='image-style'
								src={imageBanner1}
								alt='Slide 1'
							/>
						</Link>
					</section>
					<section className='slider-layout'>
						<Link to={'/mockup5'}>
							<img
								className='image-style'
								src={imageBanner1}
								alt='Slide 1'
							/>
						</Link>
					</section>
					<section className='slider-layout'>
						<Link to={'/mockup6'}>
							<img
								className='image-style'
								src={imageBanner1}
								alt='Slide 1'
							/>
						</Link>
					</section>
				</Slider>
			</main>
			<h1 className='banner-h1'>Welcome to URBAN-HAVEN</h1>
		</div>
	);
}
