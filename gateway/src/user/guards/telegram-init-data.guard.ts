import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { UserBotInterface } from '../interfaces/user-bot.interface';
import { AUTH_KEY_HEADER, UserBotErrorMessages } from '../user.constants';

@Injectable()
export class TelegramInitDataGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const botToken = this.configService.get('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const data = this.extractDataFromHeader(request);

    if (!data) {
      throw new UnauthorizedException();
    }

    const initData = new URLSearchParams(data);
    const hash = initData.get('hash');
    const user = initData.get('user')!;
    const dataToCheck: string[] = [];

    const parsedCustomerData: UserBotInterface = JSON.parse(user);
    if (parsedCustomerData.isBot) {
      throw new BadRequestException(UserBotErrorMessages.BotRegisterAttempt);
    }

    initData.sort();
    initData.forEach((item, key) => key !== 'hash' && dataToCheck.push(`${key}=${item}`));

    const secret = CryptoJS.HmacSHA256(botToken, 'WebAppData');
    const _hash = CryptoJS.HmacSHA256(dataToCheck.join('\n'), secret).toString(CryptoJS.enc.Hex);

    return hash === _hash;
  }

  private extractDataFromHeader(request: Request): string | undefined {
    return request.header(AUTH_KEY_HEADER);
  }
}
