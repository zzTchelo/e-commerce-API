import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from 'src/db/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleService]
})
export class SaleModule {}
