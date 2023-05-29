import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import markIcon from '../../../assets/icons/mark.svg';
import classNames from 'classnames';
import { InterfaceStyles } from '../../../types/props-types';
import styles from './Button.module.scss';


interface IButtonProps
	extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		'color'>, InterfaceStyles {
	time?: string;
	variant?: 'fulfilled' | 'outline';
	bgColor?: 'blue' | 'grey';
	children?: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({
												   time,
												   variant = 'fulfilled',
												   bgColor = 'blue',
												   className,
												   children
											   }) => {
	return (
		<button className={classNames(styles.root, className, {
			[styles[variant]]: variant,
			[`bg-color-${bgColor}`]: bgColor
		})}>
			{time && <div className={styles.timer}>{time}</div>}
			<div className={styles.title}>{children}</div>
				</button>
	);
};
