import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../model/user.model';
import { Model } from 'mongoose';
import { UserBotInterface } from '../interfaces/user-bot.interface';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
	}

	async create(userData: UserBotInterface) {
		const savedUser = await new this.userModel({
			telegramId: userData.id,
			name: `${userData.firstName} ${userData.lastName ?? ''}`.trim(),
			createdDate: new Date(),
		});
		return await savedUser.save();
	}

	async findById(telegramId: number) {
		return await this.userModel.findOne({telegramId}).exec();
	}

	async update(telegramId: number, userData: UserBotInterface) {
		return await this.userModel.findOneAndUpdate({telegramId}, {
			telegramId: userData.id,
			name: `${userData.firstName} ${userData.lastName ?? ''}`.trim()
		}).exec();
	}
}