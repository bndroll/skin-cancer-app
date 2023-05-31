import React, { useEffect } from 'react';
import { useBackButton } from '../../hooks/telegramHooks';
import styles from './HistoryPage.module.scss';
import { useSelector } from 'react-redux';
import { selectRecognitions } from '../../store/user/selectors';
import { classesInfoMap } from '../InfoPage/classes-info';
import { findHistoryAction } from '../../store/user/asyncActions';
import { useAppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { setActiveRecognition } from '../../store/user/slice';


const HistoryPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const {show} = useBackButton();
	const recognitions = useSelector(selectRecognitions);
	const navigate = useNavigate();

	useEffect(() => {
		show();
		dispatch(findHistoryAction());
	}, []);

	const onClickHandler = (url: string) => {
		dispatch(setActiveRecognition(url))
		navigate(`/result`, {replace: false});
	};

	return (
		<div className={styles.root}>
			<div className={styles.ttl}>Прогнозы хранятся 30 дней</div>
			{
				recognitions.map(item => (
					<div className={styles.historyItem} onClick={() => onClickHandler(item.fileUrl)}>
						<img src={item.fileUrl} alt="" className={styles.itemImage} width={80} height={80}/>
						<div className={styles.itemInfo}>
							<div className={styles.itemRec}>{classesInfoMap.get(item.diagnosis.toLowerCase() || '')?.title}</div>
							<div className={styles.itemDate}>{new Date(item.createdDate).toLocaleString()}</div>
						</div>
					</div>
				))
			}
		</div>
	);
};

export default HistoryPage;