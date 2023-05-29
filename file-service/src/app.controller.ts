import { Controller, Delete, Get, HttpCode, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileElementResponse } from './dto/file-element.response';
import { MFile } from './dto/mfile.class';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<FileElementResponse> {
		const buffer = await this.appService.convertToWebP(file.buffer);
		const saveFile: MFile = (new MFile({
			originalname: `${uuid()}.webp`,
			buffer
		}));

		return await this.appService.uploadFile(saveFile);
	}

	@Get(':dir/:id')
	async sendFile(@Res() res: Response, @Param('dir') dir: string, @Param('id') id: string) {
		return await this.appService.sendProfileImage(res, dir, id);
	}

	@Delete()
	async deleteOldFiles() {
		return await this.appService.deleteOldFiles();
	}
}
