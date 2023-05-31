export const AUTH_KEY_HEADER = 'AUTH-API-KEY';

export enum UserBotErrorMessages {
	UserNotFound = 'Пользователь не найден',
	UserAlreadyExist = 'Пользователь уже существует',
	BotRegisterAttempt = 'Попытка регистрации от бота',
	MaxMonthRecognitionsCount = 'Количество запросов на распознавание болезни в месяц превысило 10',
}