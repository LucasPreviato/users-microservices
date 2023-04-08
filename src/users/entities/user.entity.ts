import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../interfaces/users.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  constructor(props: IUser) {
    Object.assign(this, props);
  }
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
