import React from 'react';
import styles from './ProfileUserLevel.module.scss';
import markIcon from '../../../../assets/icons/mark.svg';
import classNames from 'classnames';
import { GradientText } from '../../../elements/GradientText/GradientText';


export const ProfileUserLevel: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.title}>Ваш уровень: <span>Мега</span></div>
			<div className={classNames(styles.subtitle, styles.text)}>
				Вы получаете <GradientText withIcon>+250</GradientText> за каждый заказ
			</div>
			<div className={styles.text}>
				Закажите еще <span>3 товара</span>, чтобы перейти на следующий уровень: <span>PRO</span>
			</div>
			<div className={styles.text}>
				Вы заказали товаров: <span>17</span>
			</div>
			<div className={styles.levels}>
				<div className={classNames(styles.levelLine, styles.levelInfo)}>
					<span>Уровень</span>
					<span>Баллов за заказ</span>
					<span>Заказов</span>
				</div>
				<div className={classNames(styles.levelLine)}>
					<span>Новичок</span>
					<GradientText withIcon>+50</GradientText>
					<span>0</span>
				</div>
				<div className={classNames(styles.levelLine)}>
					<span>Опытный</span>
					<GradientText withIcon>+150</GradientText>
					<span>5</span>
				</div>
				<div className={classNames(styles.levelLine)}>
					<span>Мега</span>
					<GradientText withIcon>+250</GradientText>
					<span>10</span>
				</div>
				<div className={classNames(styles.levelLine)}>
					<span>PRO</span>
					<GradientText withIcon>+350</GradientText>
					<span>20</span>
				</div>
				<div className={classNames(styles.levelLine)}>
					<span>Премиум</span>
					<GradientText withIcon>+500</GradientText>
					<span>30</span>
				</div>
			</div>
		</div>
	);
};