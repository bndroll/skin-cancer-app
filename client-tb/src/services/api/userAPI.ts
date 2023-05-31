import { ICreateRecognitionRequest, IRecognitionResponse, IUserResponse } from '../../store/user/types';
import axios from 'axios';

export const userAPI = {
	initData: window.Telegram.WebApp.initData,

	async setUser(): Promise<IUserResponse> {
		const res = await axios.post(`${process.env.REACT_APP_GATEWAY_URL}/user`, {}, {
			headers: {
				'AUTH-API-KEY': this.initData
			}
		});

		return res.data;
	},

	async findMe(): Promise<IUserResponse> {
		const res = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/user`, {
			headers: {
				'AUTH-API-KEY': this.initData
			}
		});

		return res.data;
	},

	async findHistory(): Promise<IRecognitionResponse[]> {
		const res = await axios.get(`${process.env.REACT_APP_GATEWAY_URL}/user/history`, {
			headers: {
				'AUTH-API-KEY': this.initData
			}
		});

		return res.data;
	},

	async createRecognition(dto: ICreateRecognitionRequest): Promise<IRecognitionResponse> {
		const formData = new FormData();
		formData.append('file', dto.file);

		const res = await axios.post(`${process.env.REACT_APP_GATEWAY_URL}/user/recognition`, formData, {
			headers: {
				'AUTH-API-KEY': this.initData
			}
		});

		return res.data;
	}
};