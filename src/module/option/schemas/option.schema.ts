import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop()
  optionName: string;

  @Prop({ type: Types.ObjectId, ref: 'Model', required: true })
  modelId: Types.ObjectId;


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

export const OptionSchema = SchemaFactory.createForClass(Option);

OptionSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
