import React from 'react';
import { Button } from '../../../elements/Button/Button';
import styles from './ProfileUserInfo.module.scss';


export const ProfileUserInfo: React.FC = () => {
	return (
		<div className={styles.root}>
			<div className={styles.title}>Данные получателя</div>
			<div className={styles.text}>
				Подставляются в заказ автоматически, поэтому их не надо вводить каждый раз. Вы сможете
				изменить данные на стадии оформления заказа.
			</div>
			<div className={styles.info}>
				<div className={styles.infoLine}>
					<span>ФИО получателя</span>
					<span>Алексеев Иван Петрович</span>
				</div>
				<div className={styles.infoLine}>
					<span>Контактный телефон</span>
					<span>+7 (912) 123 45-67</span>
				</div>
				<div className={styles.infoLine}>
					<span>Город</span>
					<span>Казань, Татарстан</span>
				</div>
				<div className={styles.infoLine}>
					<span>Адрес</span>
					<span>ул. Альберта Камалеева, 32 22 век</span>
				</div>
			</div>
			<Button className={styles.button} variant={'outline'} bgColor={'grey'}>Редактировать</Button>
		</div>
	);
};