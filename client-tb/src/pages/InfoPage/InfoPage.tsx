import React, { useEffect, useState } from 'react';
import { useBackButton } from '../../hooks/telegramHooks';
import styles from './InfoPage.module.scss';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { classesInfoMap, IClassInfo } from './classes-info';

const InfoPage: React.FC = () => {
	const {id} = useParams();
	const {show} = useBackButton();
	const [item, setItem] = useState<IClassInfo>();

	useEffect(() => {
		show();
		if (id) {
			setItem(classesInfoMap.get(id));
		}
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.images}>
				<Swiper
					effect={'coverflow'}
					loop={item?.images.length ? item?.images.length >= 5 : false}
					initialSlide={1}
					grabCursor={true}
					centeredSlides={true}
					slidesPerView={2}
					coverflowEffect={{
						rotate: 0,
						stretch: 0,
						depth: 100,
						modifier: 2.5,
					}}
					pagination={{ el: '.swiper-pagination', clickable: true, dynamicBullets: true }}
					modules={[EffectCoverflow, Pagination, Navigation]}
					navigation
					className={styles.slider}
				>
					{
						item?.images.map((path, index) => (
							<SwiperSlide key={index} className={styles.slide}>
								<img src={path} alt="class image" width={200} height={200} className={styles.img}/>
							</SwiperSlide>
						))
					}
					<div className={`swiper-pagination ${styles.pagination}`}></div>
				</Swiper>
			</div>

			<h3 className={styles.title}>{item?.title}</h3>
			<div className={styles.info}>{item?.body}</div>
		</div>
	);
};

export default InfoPage;