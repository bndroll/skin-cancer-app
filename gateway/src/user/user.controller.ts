import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserBotData } from './decorators/customer-bot-data.decorator';
import { UserBotInterface } from './interfaces/user-bot.interface';
import { TelegramInitDataGuard } from './guards/telegram-init-data.guard';
import { UserMapper } from './dto/mappers/user.mapper';
import { UserResponse } from './dto/user.response';
import { RecognitionMapper } from './dto/mappers/recognition.mapper';
import { RecognitionResponse } from './dto/recognition.response';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userMapper: UserMapper,
		private readonly recognitionMapper: RecognitionMapper) {
	}

	@Post()
	@UseGuards(TelegramInitDataGuard)
	async setCustomer(@UserBotData() userData: UserBotInterface): Promise<UserResponse> {
		const user = await this.userService.findById(userData.id);
		if (!user) {
			return await this.userMapper.map(await this.userService.create(userData));
		}

		return await this.userMapper.map(await this.userService.update(userData));
	}

	@Post('recognition')
	@UseGuards(TelegramInitDataGuard)
	@UseInterceptors(FileInterceptor('file'))
	async createRecognition(@UploadedFile() file: Express.Multer.File, @UserBotData() userData: UserBotInterface): Promise<RecognitionResponse> {
		return this.recognitionMapper.map(await this.userService.createRecognition(file, userData));
	}

	@Get()
	@UseGuards(TelegramInitDataGuard)
	async findById(@UserBotData() userData: UserBotInterface): Promise<UserResponse> {
		return await this.userMapper.map(await this.userService.findById(userData.id));
	}

	@Get('history')
	@UseGuards(TelegramInitDataGuard)
	async findHistoryById(@UserBotData() userData: UserBotInterface): Promise<RecognitionResponse[]> {
		return this.recognitionMapper.mapAll(await this.userService.findHistory(userData.id));
	}

	@Get('photo/:telegramId')
	async userPhoto(@Res() res: Response, @Param('telegramId') telegramId: number) {
		const stream = await this.userService.findPhoto(telegramId);
		res.set({'Content-Type': 'image/jpg'});
		stream.pipe(res);
	}
}
