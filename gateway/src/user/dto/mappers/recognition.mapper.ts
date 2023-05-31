import { Injectable } from '@nestjs/common';
import { Diagnoses, Recognition } from '../../model/recognition.model';
import { RecognitionResponse } from '../recognition.response';

@Injectable()
export class RecognitionMapper {
	constructor() {
	}

	map(recognition: Recognition): RecognitionResponse {
		return {
			userId: recognition.userId,
			value: recognition.value,
			diagnosis: Diagnoses[recognition.diagnosis],
			fileUrl: recognition.fileUrl,
			createdDate: recognition.createdDate
		};
	}

	mapAll(recognitions: Recognition[]): RecognitionResponse[] {
		return recognitions.map(item => ({
			userId: item.userId,
			diagnosis: Diagnoses[item.diagnosis],
			value: item.value,
			fileUrl: item.fileUrl,
			createdDate: item.createdDate
		}));
	}
}