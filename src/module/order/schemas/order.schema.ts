import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { OrderItem, OrderItemSchema } from './order-item.schema';
export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  platform: string;

  @Prop()
  tax: number;

  @Prop({ required: true })
  expenses: number;

  @Prop()
  total: number;

  @Prop()
  totalExpenses: number;

  @Prop()
  profitNet: string;

  @Prop({ required: true })
  status: string;

  @Prop({ type: [OrderItemSchema], default: [] }) 
  orderList: OrderItem[];

  @Prop({ default: true })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  updateBy: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
