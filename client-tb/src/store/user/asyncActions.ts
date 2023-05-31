import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICreateRecognitionRequest, IRecognitionResponse, IUserResponse } from './types';
import { userAPI } from '../../services/api/userAPI';

export const setUserAction = createAsyncThunk<IUserResponse>(
	'user/setUserAction',
	async (): Promise<IUserResponse> => {
		return await userAPI.setUser();
	}
);

export const findMeAction = createAsyncThunk<IUserResponse>(
	'user/findMe',
	async (): Promise<IUserResponse> => {
		return await userAPI.findMe();
	}
);

export const findHistoryAction = createAsyncThunk<IRecognitionResponse[]>(
	'user/findHistory',
	async (): Promise<IRecognitionResponse[]> => {
		return await userAPI.findHistory();
	}
);

export const createRecognitionAction = createAsyncThunk<IRecognitionResponse, ICreateRecognitionRequest>(
	'user/createRecognition',
	async (dto: ICreateRecognitionRequest): Promise<IRecognitionResponse> => {
		return await userAPI.createRecognition(dto);
	}
);