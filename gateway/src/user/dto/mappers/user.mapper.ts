import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/user.repository';
import { RecognitionRepository } from '../../repository/recognition.repository';
import { User } from '../../model/user.model';
import { UserResponse } from '../user.response';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserMapper {
	constructor(private readonly userRepository: UserRepository, private readonly recognitionRepository: RecognitionRepository, private readonly configService: ConfigService) {
	}

	async map(user: User): Promise<UserResponse> {
		return {
			telegramId: user.telegramId,
			name: user.name,
			createdDate: user.createdDate,
			recognitionsLeft: this.configService.get('MONTH_RECOGNITIONS_COUNT') - (await this.recognitionRepository.findMonthRecognitions(user.telegramId)),
		};
	}
}