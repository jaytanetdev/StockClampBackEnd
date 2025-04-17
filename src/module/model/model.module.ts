import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Model as ModelSchema, ModelSchema as MongooseModelSchema } from './schemas/model.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelSchema.name, schema: MongooseModelSchema }, 
    ]),
  ],
  controllers: [ModelController],
  providers: [ModelService],
  exports: [ModelService],
})
export class ModelModule {}
