import { RootState } from '../store';
import { IRecognitionResponse, IUserSliceItem, Status } from './types';

export const selectUser = (state: RootState): IUserSliceItem | null => state.user.user;
export const selectActiveRecognition = (state: RootState): IRecognitionResponse | null => state.user.activeRecognition;
export const selectRecognitions = (state: RootState): IRecognitionResponse[] => state.user.recognitions;
export const selectStatus = (state: RootState): Status => state.user.status;