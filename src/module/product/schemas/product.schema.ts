import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  productName: string;

  @Prop()
  size: string;

  @Prop()
  group: string;

  @Prop()
  cost: number;

  @Prop()
  sellingPrice: number;

  
  @Prop({ type: Types.ObjectId, ref: 'Option', required: true })
  optionId: Types.ObjectId;


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

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
