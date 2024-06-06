import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Order, findOrderByParams, orderRouteParam } from './order';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

    constructor(
        private readonly orderService : OrderService
    ){}

    @Post()
    async post(@Body() order : Order) : Promise<Order>{
        return await this.orderService.createOrder(order);
    }

    @Get()
    async getAll(@Query() params : findOrderByParams) : Promise<Order[]>{
        return await this.orderService.findAllOrder(params);
    }

    @Get('/:id')
    async getById(@Param('id') id : string) : Promise<Order>{
        return await this.orderService.findOrderById(id);
    }

    @Put('/:id')
    async put(@Param() param : orderRouteParam, @Body() order : Order){
        return await this.orderService.updateOrder(param.id, order);
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.orderService.deleteOrder(id);
    }
}
