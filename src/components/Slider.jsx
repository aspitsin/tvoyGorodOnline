import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from 'mui-image';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

export default function Slider({ pictures }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<>
			{pictures && <>
				<Swiper
					style={{
						"--swiper-navigation-color": "#fff",
						"--swiper-pagination-color": "#fff",
					}}
					loop={true}
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mySwiper2"
				>
					{pictures.map((picture) => (
						<SwiperSlide>
							<Image src={picture} height="500px" />
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					onSwiper={setThumbsSwiper}
					loop={true}
					spaceBetween={10}
					slidesPerView={4}
					freeMode={true}
					watchSlidesProgress={true}
					modules={[FreeMode, Navigation, Thumbs]}
					className="mySwiper"
				>
					{pictures.map((picture) => (
						<SwiperSlide>
							<Image src={picture} height="200px" />
						</SwiperSlide>
					))}
				</Swiper>
			</>}
		</>
	);
}