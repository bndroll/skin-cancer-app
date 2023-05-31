export interface IUserSliceState {
	user: IUserSliceItem | null;
	recognitions: IRecognitionResponse[];
	activeRecognition: IRecognitionResponse | null;
	status: Status;
}

export enum Status {
	LOADING = 'LOADING',
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	NEVER = 'NEVER',
}

export interface IUserSliceItem extends IUserResponse {
	pictureUrl: string;
}

export interface IUserResponse {
	telegramId: number;
	username: string;
	name: string;
	createdDate: Date;
	recognitionsLeft: number;
}

export interface IRecognitionResponse {
	userId: number;
	fileUrl: string;
	diagnosis: string;
	value: number;
	createdDate: Date;
}

export interface ICreateRecognitionRequest {
	file: File;
}