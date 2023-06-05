import { IUserSliceState, Status } from './types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRecognitionAction, findHistoryAction, findMeAction, setUserAction } from './asyncActions';

const initialState: IUserSliceState = {
	user: null,
	activeRecognition: null,
	recognitions: [],
	status: Status.NEVER
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearStatus(state) {
			state.status = Status.NEVER;
		},

		setActiveRecognition(state, action: PayloadAction<string>) {
			state.activeRecognition = state.recognitions.find(item => item.fileUrl === action.payload) || null;
			state.status = Status.SUCCESS;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(setUserAction.fulfilled, (state, action) => {
			state.user = {
				name: action.payload.name,
				telegramId: action.payload.telegramId,
				createdDate: action.payload.createdDate,
				recognitionsLeft: action.payload.recognitionsLeft,
				pictureUrl: `${process.env.REACT_APP_GATEWAY_URL}/user/photo/${action.payload.telegramId}`
			};
		});

		builder.addCase(findMeAction.fulfilled, (state, action) => {
			state.user = {
				name: action.payload.name,
				telegramId: action.payload.telegramId,
				createdDate: action.payload.createdDate,
				recognitionsLeft: action.payload.recognitionsLeft,
				pictureUrl: `${process.env.REACT_APP_GATEWAY_URL}/user/photo/${action.payload.telegramId}`
			};
		});

		builder.addCase(findHistoryAction.fulfilled, (state, action) => {
			state.recognitions = action.payload.reverse();
		});

		builder.addCase(createRecognitionAction.fulfilled, (state, action) => {
			state.activeRecognition = action.payload;
			state.status = Status.SUCCESS;
		});

		builder.addCase(createRecognitionAction.pending, (state, action) => {
			state.activeRecognition = null;
			state.status = Status.LOADING;
		});

		builder.addCase(createRecognitionAction.rejected, (state, action) => {
			state.activeRecognition = null;
			state.status = Status.ERROR;
		});
	}
});

export const {clearStatus, setActiveRecognition} = userSlice.actions;
export default userSlice.reducer;
