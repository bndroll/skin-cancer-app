import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { Response } from 'express';
import { MFile } from './dto/mfile.class';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class AppService {
	constructor(private readonly configService: ConfigService) {
	}

	async uploadFile(file: MFile) {
		const dateId = this.getDateId(new Date());
		const directory = `${path}/uploads/${dateId}`;
		await ensureDir(directory);
		await writeFile(`${directory}/${file.originalname}`, file.buffer);
		return {
			url: `${this.configService.get('SERVICE_URL')}/${dateId}/${file.originalname}`
		};
	}

	async sendProfileImage(res: Response, dir: string, id: string) {
		res.set({'Content-Type': 'image/webp'});
		return res.sendFile(`${path}/uploads/${dir}/${id}`);
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}

	async deleteOldFiles() {
		const date = new Date();
		const directory = `${path}/uploads/${this.getDateId(new Date(date.setMonth(date.getMonth() - 1)))}`;
		fs.rmSync(directory, {recursive: true, force: true});
	}

	private getDateId(date: Date): string {
		return date.setHours(0, 0, 0, 0).toString().slice(0, 8);
	}
}
