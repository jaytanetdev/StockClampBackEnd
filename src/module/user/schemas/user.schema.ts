import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
 
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  souce: string;

  @Prop()
  googleId: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Date, default: Date.now })
  createAt: Date;


  @Prop({ type: Types.ObjectId, ref: 'User'})
  createBy: Types.ObjectId;  

  @Prop()
  updateAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User'})
  updateBy: Types.ObjectId; 
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
UserSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updated_at: new Date() });
  next();
});
