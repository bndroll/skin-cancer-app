import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { getMongoConfig } from './config/mongo.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
			isGlobal: true,
		}),
		MongooseModule.forRootAsync(getMongoConfig()),
		ScheduleModule.forRoot(),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
}
