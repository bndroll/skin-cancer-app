import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Header } from '../../component/Header/Header';

export const Layout: React.FC = () => {
	return (
		<div>
			<Header/>
			<div className={styles.root}>
				<Outlet/>
			</div>
		</div>
	);
};

