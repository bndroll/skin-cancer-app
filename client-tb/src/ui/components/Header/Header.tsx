import React from 'react';
import { Link } from 'react-router-dom';
import { useWebAppUser } from '../../../hooks/telegramHooks';
import defaultUserPhoto from '../../../assets/icons/default_avatar.svg';
import telegramLogo from '../../../assets/icons/telegram_logo.svg';
import styles from './Header.module.scss';


export const Header: React.FC = () => {
	const {id, first_name, last_name} = useWebAppUser();

	return (
		<div className={styles.root}>
			<Link className={styles.user} to={'/profile'}>
				<img className={styles.photo} src={`http://localhost:8080/user/photo/${id}`} width={36} height={36}
					 alt={'profile photo'}/>
				<div className={styles.username}>{first_name + ' ' + last_name}</div>
				<div className={styles.status}><span>PRO</span></div>
			</Link>
			<div className={styles.telegramLink}>
				<img src={telegramLogo} alt="telegram logo"/>
				<span>@poizonshop</span>
			</div>
		</div>
	);
};