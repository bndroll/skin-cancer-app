import React, { ChangeEvent, useEffect, useState } from 'react';
import { Header } from '../../ui/components/Header/Header';
import { useBackButton, useWebAppInitData, useWebAppUser } from '../../hooks/telegramHooks';
import { Button } from '../../ui/elements/Button/Button';
import arrowIcon from '../../assets/icons/arrow.svg';
import styles from './MainPage.module.scss';
import classNames from 'classnames';
import axios from 'axios';

const MainPage: React.FC = () => {
	const {hide} = useBackButton();
	const user = useWebAppUser();
	const {initData} = useWebAppInitData();
	const [u, setU] = useState();
	const [r, setR] = useState();

	const sendRequest = async () => {
		console.log(user);

		await axios.post(`http://localhost:8080/user`, {}, {
			headers: {
				'AUTH-API-KEY': initData
			}
		});

		await axios.get(`http://localhost:8080/user`, {
			headers: {
				'AUTH-API-KEY': initData
			}
		}).then(r => setU(r.data));

		// await axios.post(`http://localhost:3001/api/customer-bot/calculation`, {
		// 	productModel: 'Jordan 1',
		// 	productUrl: 'https://google.com',
		// 	productSize: '23',
		// 	productCategoryId: 'd7126bb3-9ac3-4b13-bb08-364cde86f77b',
		// 	priceCny: '398'
		// }, {
		// 	headers: {
		// 		'X-API-KEY': initData
		// 	}
		// })
		//
		// await axios.delete(`http://localhost:3001/api/customer-bot/calculation/0ed50a72-544e-4907-93bb-33b23f5e42d9`, {
		// 	headers: {
		// 		'X-API-KEY': initData
		// 	}
		// })

		// await axios.post(`http://localhost:3001/api/customer-bot/delivery`, {
		// 	deliveryType: 'CDEK_COURIER',
		// 	deliveryFio: 'Петров Петр Петрович',
		// 	deliveryPhone: '+79053851247',
		// 	deliveryCity: 12507,
		// 	deliveryAddress: 'Мой адрес 2',
		// 	deliveryComment: 'Побыстрее пожалуйста',
		// }, {
		// 	headers: {
		// 		'telegram-init-data': initData
		// 	}
		// })

		// await axios.patch(
		// 	`http://localhost:3001/api/customer-bot/delivery/0faa6c8d-882a-412e-8186-9d7185d34c2c/active`,
		// 	{},
		// 	{
		// 		headers: {
		// 		'X-API-KEY': initData
		// 	}
		// })

		// await axios.get(`http://localhost:3001/api/customer-bot/order?status=COMPLETED`, {
		// 		headers: {
		// 			'X-API-KEY': initData
		// 		}
		// })
	};

	useEffect(() => {
		hide();
		sendRequest();
	}, []);

	const onUploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];
			const reader = new FileReader();

			reader.onload = () => {
				const formData = new FormData();
				formData.append('file', file);

				axios.post(`http://localhost:8080/user/recognition`, formData, {
					headers: {
						'AUTH-API-KEY': initData
					}
				}).then(r => setR(r.data));
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			<Header/>
			<div className={styles.buttonsContainer}>
				<Button bgColor={'grey'} variant={'outline'}>
					<img className={classNames(styles.icon, styles.prev)} src={arrowIcon} alt="back"/>
					Назад
				</Button>
				<Button>
					Далее
					<img src={arrowIcon} alt="next"/>
				</Button>
			</div>

			<div>
				{JSON.stringify(user)}
			</div>

			<div>
				{JSON.stringify(u)}
			</div>

			<div>
				{JSON.stringify(r)}
			</div>

			<div>
				<input type="file" onChange={onUploadImageHandler}/>
			</div>
		</div>
	);
};

export default MainPage;