import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type ModelDocument = Model & Document;

@Schema()
export class Model {
  @Prop()
  modelName: string;

  @Prop({ default: true })
  active: boolean;

  
  @Prop({ type: Types.ObjectId, ref: 'Material', required: true })
  materialId: Types.ObjectId;
  
  @Prop({ type: Date, default: Date.now })
  createAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User'})
  createBy: Types.ObjectId;

  @Prop()
  updateAt: Date;
  
  @Prop({ type: Types.ObjectId, ref: 'User'})
  updateBy: Types.ObjectId; 
}

export const ModelSchema = SchemaFactory.createForClass(Model);

ModelSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updatedAt: new Date() }); 
  next();
});
