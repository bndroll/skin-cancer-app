import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recognition } from '../model/recognition.model';

@Injectable()
export class RecognitionRepository {
	constructor(@InjectModel(Recognition.name) private readonly recognitionModel: Model<Recognition>) {
	}

	async create(createRecognitionDto: { userId: number, fileUrl: string, recId: number }) {
		const savedRecognition = await new this.recognitionModel({
			userId: createRecognitionDto.userId,
			fileUrl: createRecognitionDto.fileUrl,
			diagnosis: createRecognitionDto.recId,
			createdDate: new Date()
		});
		return await savedRecognition.save();
	}

	async findMonthRecognitions(id: number) {
		const date = new Date();
		return this.recognitionModel.count({$and: [{userId: id}, {createdDate: {$gte: new Date(date.setMonth(date.getMonth() - 1))}}]}).exec();
	}

	async findHistoryRecognition(id: number) {
		return this.recognitionModel.find({userId: id}).exec();
	}

	async deleteOldRecognitions() {
		const date = new Date();
		await this.recognitionModel.deleteMany({createdDate: {$lt: new Date(date.setMonth(date.getMonth() - 1))}});
	}
}