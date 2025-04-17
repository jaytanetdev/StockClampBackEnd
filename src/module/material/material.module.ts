import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Material as MaterialSchema,
  MaterialSchema as MongooseMaterialSchema,
} from './schemas/material.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MaterialSchema.name, schema: MongooseMaterialSchema },
    ]),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports:[MaterialService]
})
export class MaterialModule {}
