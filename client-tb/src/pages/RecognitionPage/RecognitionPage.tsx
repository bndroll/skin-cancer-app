import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useBackButton } from '../../hooks/telegramHooks';
import styles from './RecognitionPage.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import emptyImg from '../../assets/images/empty.png';
import { useAppDispatch } from '../../store/store';
import { createRecognitionAction } from '../../store/user/asyncActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectStatus, selectUser } from '../../store/user/selectors';
import { Status } from '../../store/user/types';
import closeIcon from '../../assets/icons/close.svg';

interface ICreateRecognitionForm {
	file: FileList;
}

const yupSchema = yup.object({
	file: yup.mixed().test('required', 'Вставьте фото', value => !!value)
});

const RecognitionPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const {show} = useBackButton();
	const imgRef = useRef<HTMLImageElement | null>(null);
	const [showButton, setShowButton] = useState(false);
	const status = useSelector(selectStatus);
	const user = useSelector(selectUser);
	const [showModal, setShowModal] = useState(true);
	const {register, handleSubmit, formState: {errors}} = useForm<ICreateRecognitionForm>({
		resolver: yupResolver(yupSchema)
	});

	useEffect(() => {
		show();
	}, []);

	useEffect(() => {
		if (status === Status.SUCCESS) {
			navigate('/result', {replace: true});
		}
	}, [status]);

	const submitHandler = (data: ICreateRecognitionForm) => {
		dispatch(createRecognitionAction({
			file: data.file[0]
		}));
	};

	const changeFileInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = (event) => {
				if (imgRef.current) {
					imgRef.current.src = event.target?.result || emptyImg;
					setShowButton(true);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div className={styles.root}>
			<div className={styles.instruction}>
				<div>1. Загрузите фотографию проблемного участка</div>
				<div>2. Проверьте качество фото и нажмите отправить</div>
				<div>3. Дождитесь результата</div>
			</div>

			{user?.recognitionsLeft && user?.recognitionsLeft > 0 ? (
				<>
					<form onSubmit={handleSubmit(submitHandler)}>
						<input {...register('file')}
									 type="file"
									 name="file"
									 id="file__input"
									 onChange={changeFileInputHandler}
									 className={styles.fileInput}/>

						<img src={emptyImg} alt="" ref={imgRef} width={250} height={250} className={styles.image}/>

						{showButton && <input type={'submit'} className={styles.submit}
                                  value={status === Status.NEVER ? `Отправить` : `Загрузка...`}/>}
					</form>

					{showModal && (
						<div className={styles.modal} onClick={() => setShowModal(false)}>
							<span className={styles.modalText}>У вас осталось {user?.recognitionsLeft} прогноза(ов)</span>
							<button className={styles.modalButton}>
								<img src={closeIcon} alt="" className={styles.modalImage} width={20} height={20}/>
							</button>
						</div>
					)}
				</>
			) : (
				<div className={styles.recognitionsLeft}>Вы исчерпали лимит прогнозов на текущий месяц</div>
			)}
		</div>
	);
};

export default RecognitionPage;