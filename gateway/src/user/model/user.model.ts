import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
	@Prop({required: true, unique: true})
	telegramId: number;

	@Prop({required: true})
	username: string;

	@Prop({required: true})
	name: string;

	@Prop({required: true})
	createdDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);