import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import appConfig from './config/app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelModule } from './module/model/model.module';

import dbConfig from './config/db.config';
import googleConfig from './config/google.config';
import { OptionModule } from './module/option/option.module';
import { ProductModule } from './module/product/product.module';
import { OrderModule } from './module/order/order.module';
import { MaterialModule } from './module/material/material.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, dbConfig,googleConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('db'); 
        return {
          uri: db?.url,
          user: db?.user,
          pass: db?.pass,
          dbName: db?.dbName,
        };
      },
    }),
    AuthModule,
    UserModule,
    ModelModule,
    OptionModule,
    ProductModule,
    OrderModule,
    MaterialModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
