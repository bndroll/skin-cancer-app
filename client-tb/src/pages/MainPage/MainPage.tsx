import React, { useEffect } from 'react';
import { useBackButton } from '../../hooks/telegramHooks';
import styles from './MainPage.module.scss';
import { ClassItem } from '../../component/ClassItem/ClassItem';
import { classesInfoMap } from '../InfoPage/classes-info';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import arrowIcon from '../../assets/icons/arrow.svg';
import { useAppDispatch } from '../../store/store';
import { findMeAction } from '../../store/user/asyncActions';

const MainPage: React.FC = () => {
	const {hide} = useBackButton();
	const dispatch = useAppDispatch();

	useEffect(() => {
		hide();
		dispatch(findMeAction());
	}, []);

	return (
		<div className={styles.root}>
			<div className={styles.classes}>
				{Array.from(classesInfoMap).map(([id, value]) => (
					<ClassItem key={id} id={id} title={value.title}/>
				))}
			</div>

			<div className={styles.upload}>
				<div className={styles.load}>
					<img src={searchIcon} alt="recognize icon" width={30} height={30}/>
				</div>
				<div className={styles.info}>
					<div className={styles.text}>Воспользуйтесь нашей разработкой для классификации вашего заболевания</div>
					<Link to={'/recognition'} className={styles.button}>Попробовать</Link>
				</div>
			</div>

			<Link to={'/history'} className={styles.history}>
				<div className={styles.txt}>Посмотреть историю ваших фото</div>
				<div className={styles.pic}>
					<img src={arrowIcon} alt="arrow icon" width={30} height={30}/>
				</div>
			</Link>
		</div>
	);
};

export default MainPage;