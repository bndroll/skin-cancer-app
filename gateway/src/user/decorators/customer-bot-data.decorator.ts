import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserBotInterface } from '../interfaces/user-bot.interface';
import { Request } from 'express';
import { AUTH_KEY_HEADER } from '../user.constants';

export const UserBotData = createParamDecorator(
	(key: keyof UserBotInterface | undefined, ctx: ExecutionContext) => {
		const request: Request = ctx.switchToHttp().getRequest();
		const initData = request.header(AUTH_KEY_HEADER) as string;
		const initDataUrl = new URLSearchParams(initData);
		const initCustomerData = initDataUrl.get('user')!;
		const parsedCustomerData: UserBotInterface = JSON.parse(initCustomerData);
		Object.keys(parsedCustomerData).forEach(key => {
			const newKey = key.replace(/(_\w)/g, m => m[1].toUpperCase());
			if (newKey != key) {
				parsedCustomerData[newKey] = parsedCustomerData[key];
				delete parsedCustomerData[key];
			}
		});
		return key ? parsedCustomerData[key] : parsedCustomerData;
	}
);
