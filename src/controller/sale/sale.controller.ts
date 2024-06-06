import { Post, Get, Body, Controller, Query, Param, Put, Delete } from '@nestjs/common';
import { Sale, findSaleByParams, saleRouteParams } from './sale';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {

    constructor(
        private readonly saleService : SaleService
    ){}

    @Post('')
    async post(@Body() sale : Sale) : Promise<Sale>{
        return await this.saleService.createSale(sale);
    }

    @Get('')
    async getAll(@Query() params : findSaleByParams) : Promise<Sale[]>{
        return await this.saleService.findAllSale(params);
    }

    @Get('/:id')
    async getById(@Param('id') id : string) : Promise<Sale>{
        return await this.saleService.findSalebyId(id);
    }

    @Put('/:id')
    async put(@Param('id') param : saleRouteParams, @Body() sale : Sale){
        await this.saleService.updateSale(param.id, sale);
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.saleService.deleteSale(id);
    }
}
