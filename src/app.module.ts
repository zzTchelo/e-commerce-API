import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './controller/product/product.controller';
import { ProductService } from './controller/product/product.service';
import { ProductModule } from './controller/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { UserModule } from './controller/user/user.module';
import { AuthModule } from './controller/auth/auth.module';
import { SaleModule } from './controller/sale/sale.module';
import { OrderModule } from './controller/order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    ProductModule,
    DbModule,
    UserModule,
    AuthModule,
    SaleModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
