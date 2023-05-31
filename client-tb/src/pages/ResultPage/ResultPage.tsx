import React, { useEffect, useState } from 'react';
import styles from './ResultPage.module.scss';
import { useBackButton } from '../../hooks/telegramHooks';
import { useSelector } from 'react-redux';
import { selectActiveRecognition } from '../../store/user/selectors';
import { useAppDispatch } from '../../store/store';
import { clearStatus } from '../../store/user/slice';
import { Link, useNavigate } from 'react-router-dom';
import { classesInfoMap } from '../InfoPage/classes-info';
import docImage from '../../assets/images/doctor.jpg';

const ResultPage: React.FC = () => {
	const {show} = useBackButton();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [resultType, setResultType] = useState<'ai' | 'dc'>('ai');
	const [orderDoc, setOrderDoc] = useState(false);
	const activeRecognition = useSelector(selectActiveRecognition);
	const classItem = classesInfoMap.get(activeRecognition?.diagnosis.toLowerCase() || '');

	useEffect(() => {
		show();

		if (!activeRecognition) {
			navigate('/', {replace: true});
		}

		return () => {
			dispatch(clearStatus());
		};
	}, []);

	const getText = () => {
		const wordsArr = classItem?.body.split(' ');
		if (wordsArr && wordsArr.length > 20) {
			return wordsArr.slice(0, 20).join(' ') + '...';
		}
		return wordsArr?.join(' ');
	};

	const getValue = () => {
		return activeRecognition && Math.ceil(activeRecognition?.value * 10000) / 100;
	};

	return (
		<div className={styles.root}>
			<img src={activeRecognition?.fileUrl} alt="" width={200} height={200} className={styles.image}/>
			<div className={styles.type}>
				<div className={`${styles.typeItem} ${styles.typeItemLeft} ${resultType === 'ai' ? styles.typeItemActive : ''}`}
						 onClick={() => setResultType('ai')}>
					ИИ
				</div>
				<div
					className={`${styles.typeItem} ${styles.typeItemRight} ${resultType === 'dc' ? styles.typeItemActive : ''}`}
					onClick={() => setResultType('dc')}>
					Доктор
				</div>
			</div>

			{resultType === 'ai' && (
				<>
					<div className={styles.title}><span>{classItem?.title}</span> - {getValue()}%</div>
					<div className={styles.text}>{getText()}</div>
					<Link to={`/info/${activeRecognition?.diagnosis.toLowerCase()}`} className={styles.infoButton}>Читать
						больше</Link>
				</>
			)}

			{resultType === 'dc' && (
				<>
					<div className={styles.doc}>
						<img src={docImage} alt="" className={styles.docImage} width={50} height={50}/>
						<div className={styles.docInfo}>
							<div className={styles.docName}>Андреева Анна Васильевна</div>
							<div className={styles.docRang}>Дерматолог, Врач-косметолог, Трихолог</div>
						</div>
					</div>
					<div className={`${styles.docButton} ${orderDoc ? styles.docButtonActive : ''}`}
							 onClick={() => setOrderDoc(true)}>
						{orderDoc ? `Доктор скоро с вами свяжется` : `Заказать анализ`}
					</div>
				</>
			)}
		</div>
	);
};

export default ResultPage;