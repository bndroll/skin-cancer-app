import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';


export const Header: React.FC = () => {
	const location = useLocation();

	const getPageName = (pathname: string) => {
		switch (pathname.split('/')[1]) {
			case '':
				return `Главная`;
			case 'recognition':
				return 'Прогноз';
			case 'history':
				return 'История';
			case 'info':
				return 'База знаний';
			case 'result':
				return 'Результат';
			default:
				return ``
		}
	}

	return (
		<div className={styles.root}>
			{getPageName(location.pathname)}
		</div>
	);
};