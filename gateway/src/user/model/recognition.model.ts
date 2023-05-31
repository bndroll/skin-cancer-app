import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Diagnoses {
	Akiec,
	Bcc,
	Bkl,
	Df,
	Mel,
	Nv,
	Vasc,
}

@Schema()
export class Recognition {
	@Prop({required: true})
	userId: number;

	@Prop({required: true, unique: true})
	fileUrl: string;

	@Prop({required: true, enum: Diagnoses})
	diagnosis: Diagnoses;

	@Prop({required: true})
	value: number;

	@Prop({required: true})
	createdDate: Date;
}

export const RecognitionSchema = SchemaFactory.createForClass(Recognition);