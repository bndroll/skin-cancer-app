import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RecognitionRepository } from '../repository/recognition.repository';
import { UserService } from '../user.service';

@Injectable()
export class UrlCronService {
	constructor(
		private readonly recognitionRepository: RecognitionRepository,
		private readonly userService: UserService
	) {
	}

	@Cron('0 0 4 * * *')
	async deleteOldRecognitions() {
		await this.recognitionRepository.deleteOldRecognitions();
		await this.userService.deleteFiles();
	}
}