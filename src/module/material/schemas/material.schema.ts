import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type MaterialDocument = Material & Document;

@Schema()
export class Material {
  
  @Prop()
  materialName: string;

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

export const MaterialSchema = SchemaFactory.createForClass(Material);

MaterialSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updatedAt: new Date() }); 
  next();
});
