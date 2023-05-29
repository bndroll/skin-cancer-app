import React from 'react';
import { useWebAppUser } from '../../../../hooks/telegramHooks';
import defaultUserPhoto from '../../../../assets/icons/default_avatar.svg';
import styles from './ProfileHead.module.scss';


export const ProfileHead: React.FC = () => {
	const {photo_url, first_name, last_name} = useWebAppUser();

	return (
		<div className={styles.root}>
			<div>Профиль</div>
			<img className={styles.photo}
				 src={photo_url || defaultUserPhoto}
				 width={65}
				 height={65}
				 alt={'profile photo'}/>
			<div className={styles.username}>{first_name + ' ' + last_name}</div>
			<div className={styles.status}><span>Мега</span></div>
		</div>
	);
};