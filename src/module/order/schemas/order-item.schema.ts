// src/module/order/schema/order-item.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ _id: false }) // ไม่ต้องมี _id แยกในแต่ละ item
export class OrderItem {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  costEA: number;

  @Prop({ required: true })
  sellingPriceEA: number;

  @Prop({ required: true })
  sellingPriceNet: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
