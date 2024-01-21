import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/Banner.css';
import imageBanner1 from '../assets/images/banner1.jpg';
import imageBanner2 from '../assets/images/banner2.png';

export default function Banner() {
	const settings = {
		dots: true,
		useCSS: true,
		centerMode:true,
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
						<img
							className='image-style'
							src={imageBanner1}
							alt='Slide 1'
						/>
					</section>
					<section className='slider-layout'>
						<img
							className='image-style'
							src={imageBanner2}
							alt='Slide 2'
						/>
					</section>
					<section className='slider-layout'>
						<img
							className='image-style'
							src={imageBanner1}
							alt='Slide 1'
						/>
					</section>
					<section className='slider-layout'>
						<img
							className='image-style'
							src={imageBanner1}
							alt='Slide 1'
						/>
					</section>
					<section className='slider-layout'>
						<img
							className='image-style'
							src={imageBanner1}
							alt='Slide 1'
						/>
					</section>
					<section className='slider-layout'>
						<img
							className='image-style'
							src={imageBanner1}
							alt='Slide 1'
						/>
					</section>
				</Slider>
			</main>
			<h1 className='banner-h1'>Welcome to URBAN-HAVEN</h1>
		</div>
	);
}
