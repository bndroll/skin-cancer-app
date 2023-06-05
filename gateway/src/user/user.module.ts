import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.model';
import { Recognition, RecognitionSchema } from './model/recognition.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { UserRepository } from './repository/user.repository';
import { UserMapper } from './dto/mappers/user.mapper';
import { RecognitionRepository } from './repository/recognition.repository';
import { RecognitionMapper } from './dto/mappers/recognition.mapper';
import { HttpModule } from '@nestjs/axios';
import { RecognitionCronService } from './cron/recognition-cron.service';

@Module({
	imports: [
		ConfigModule,
		HttpModule,
		MongooseModule.forFeature([
			{name: User.name, schema: UserSchema},
			{name: Recognition.name, schema: RecognitionSchema}
		])
	],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		UserMapper,
		RecognitionRepository,
		RecognitionMapper,
		RecognitionCronService,
		{
			provide: 'TGBOT',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				new TelegramBot(configService.get('TELEGRAM_BOT_TOKEN'), {polling: true})
		}
	]
})
export class UserModule {
}
