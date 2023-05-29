import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './GradientText.module.scss';
import markIcon from '../../../assets/icons/mark.svg';
import { InterfaceStyles } from '../../../types/props-types';
import classNames from 'classnames';


interface IGradientTextProps
	extends Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
		'color'>, InterfaceStyles {
	withIcon?: boolean;
	children: string;
}

export const GradientText: React.FC<IGradientTextProps> = ({children, withIcon, className}) => {
	return (
		<span className={classNames(className, styles.root)}>
			{children}
			{withIcon && <img src={markIcon} alt="mark" width={17} height={17}/>}
		</span>
	);
};