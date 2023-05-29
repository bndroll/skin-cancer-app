import React, { useEffect } from 'react';
import { useBackButton } from '../../hooks/telegramHooks';
import { ProfileHead } from '../../ui/components/Profile/ProfileHead/ProfileHead';
import { ProfileUserInfo } from '../../ui/components/Profile/ProfileUserInfo/ProfileUserInfo';
import { ProfileUserLevel } from '../../ui/components/Profile/ProfileUserLevel/ProfileUserLevel';
import styles from './ProfilePage.module.scss';
import { ProfileBusiness } from '../../ui/components/Profile/ProfileBusiness/ProfileBusiness';


const ProfilePage: React.FC = () => {
	const {show} = useBackButton();

	useEffect(() => {
		show();
	}, []);

	return (
		<div className={styles.root}>
			<ProfileHead/>
			<ProfileUserInfo/>
			<ProfileUserLevel/>
			<ProfileBusiness/>
		</div>
	);
};

export default ProfilePage;