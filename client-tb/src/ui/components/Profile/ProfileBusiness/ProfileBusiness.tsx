import React from 'react';
import styles from './ProfileBusiness.module.scss';
import classNames from 'classnames';
import arrow from '../../../../assets/icons/arrow-line.svg';
import { Button } from '../../../elements/Button/Button';


export const ProfileBusiness: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.title}>Подключитe<br/><span>бизнес-аккаунт</span></div>
			<div className={classNames(styles.text, styles.info)}>
				Для оптовых покупателей. Выгоден, если вы делаете через нас от 30 заказов в месяц.
			</div>
			<div className={classNames(styles.conditions, styles.text)}>
				<div className={styles.conditions_title}>Условия</div>
				<div>Комиссия за заказ <span className={styles.line}>1 500 ₽</span> <img src={arrow}/> 750 ₽</div>
				<div>Нет начислений и списаний баллов</div>
				<div>Нет прогресса по уровням аккаунта</div>
			</div>
			<Button className={styles.button}>Подключить на месяц за 15 000 ₽</Button>
		</div>
	);
};