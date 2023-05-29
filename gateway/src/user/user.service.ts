import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { UserRepository } from './repository/user.repository';
import { UserBotInterface } from './interfaces/user-bot.interface';
import { RecognitionRepository } from './repository/recognition.repository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';

@Injectable()
export class UserService implements OnApplicationBootstrap {
	constructor(
		@Inject('TGBOT') private readonly bot: TelegramBot,
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly userRepository: UserRepository,
		private readonly recognitionRepository: RecognitionRepository
	) {
	}

	async onApplicationBootstrap() {
		this.bot.onText(/\/start(.*)/, message => {
			this.bot.sendMessage(message.chat.id, `Привет! Я бот, созданный для того, чтобы распознавать и классифицировать рак кожи. Чтобы использовать весь функционал нажмите кнопку ниже ↓`, {
				reply_markup: {
					inline_keyboard: [[{
						text: 'Перейти в приложение',
						web_app: {url: process.env.WEB_APP_URL}
					}]]
				}
			});
		});
	}

	async create(userData: UserBotInterface) {
		return await this.userRepository.create(userData);
	}

	async createRecognition(file: Express.Multer.File, userData: UserBotInterface) {
		const formData = new FormData();
		formData.append('file', Buffer.from(file.buffer), file.originalname);
		const fileUrl = (await this.httpService.axiosRef.post<{ url: string }>(
				`${this.configService.get('FILE_SERVICE_URL')}`,
				formData,
				{headers: formData.getHeaders()})
		).data.url;

		const modelRes = (await this.httpService.axiosRef.post<{ max: number, index: number }>(
				`${this.configService.get('MODEL_SERVICE_URL')}/predict`,
				{url: `${this.configService.get('FILE_SERVICE_URL')}/${fileUrl.split('/').slice(3).join('/')}`})
		).data;

		return await this.recognitionRepository.create({
			userId: userData.id,
			fileUrl: fileUrl,
			recId: modelRes.index
		});
	}

	async findById(telegramId: number) {
		return await this.userRepository.findById(telegramId);
	}

	async findPhoto(telegramId: number) {
		const photos = await this.bot.getUserProfilePhotos(telegramId, {limit: 1});
		return this.bot.getFileStream(photos.photos[0][1].file_id);
	}

	async update(userData: UserBotInterface) {
		return await this.userRepository.update(userData.id, userData);
	}

	async findHistory(id: number) {
		return await this.recognitionRepository.findHistoryRecognition(id);
	}

	async deleteFiles() {
		await this.httpService.axiosRef.delete(`${this.configService.get('FILE_SERVICE_URL')}`);
	}
}
