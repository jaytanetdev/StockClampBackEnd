import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  amount: number;

  @Prop({required:true})
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({required:true})
  cost: number;

  @Prop({required:true})
  sellingPrice: number;

  @Prop({required:true})
  expenses: number;

  @Prop({required:true})
  profit: number;

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

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
