import React from 'react';
import styles from './ClassItem.module.scss';
import { Link } from 'react-router-dom';

interface IClassItem {
	id: string;
	title: string;
}

export const ClassItem: React.FC<IClassItem> = ({id, title}) => {
	return (
		<Link to={`/info/${id}`} className={styles.root}>
			{title}
		</Link>
	);
};