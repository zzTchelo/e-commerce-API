import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order, findOrderByParams } from './order';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrderEntity } from 'src/db/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository : Repository<OrderEntity>
    ){}

    async createOrder(order : Order) : Promise<Order>{
        const orderToSave : Partial<OrderEntity> = {
            price : order.price,
            productId : order.productId,
            quantity : order.quantity,
            saleId : order.saleId,
            status : order.status,
            updatedAt : order.updatedAt
        } 

        await this.orderRepository.save(orderToSave);
        return this.mapEntity(orderToSave);
    }

    async findAllOrder(params : findOrderByParams) : Promise<Order[]>{
        const searchParams : FindOptionsWhere<OrderEntity> = {}

        if (params.id)
            searchParams.id = params.id

        if (params.productId)
            searchParams.productId = params.productId

        if (params.saleId)
            searchParams.saleId = params.saleId

        if (params.status)
            searchParams.status = params.status

        const orderFound = await this.orderRepository.find({
            where : searchParams
        });

        return orderFound.map(product => this.mapEntity(product));
    }

    async findOrderById(id : string) : Promise<Order>{
        const orderFound = await this.orderRepository.findOne({
            where : { id }
        });

        if (!orderFound)
            throw new HttpException(`Order not found.`, HttpStatus.NOT_FOUND);

        return this.mapEntity(orderFound);
    }

    async updateOrder(id : string, order : Order){
        const orderFound = await this.orderRepository.findOne({
            where : { id }
        });

        if (!orderFound)
            throw new HttpException(`Order not found.`, HttpStatus.NOT_FOUND);

        await this.orderRepository.update(id, this.mapDatatoEntity(order));
    }

    async deleteOrder(id : string){
        const result = await this.orderRepository.delete(id);

        if (!result.affected)
            throw new HttpException(`Order not found.`, HttpStatus.NOT_FOUND);
    }

    private mapEntity(order : Partial<OrderEntity>) : Order{
        return {
            id : order.id,
            price : order.price,
            productId : order.productId,
            quantity : order.quantity,
            saleId : order.saleId,
            status : order.status,
            updatedAt : order.updatedAt
        }
    }

    private mapDatatoEntity(order : Order) : Partial<OrderEntity>{
        return {
            price : order.price,
            productId : order.productId,
            quantity : order.quantity,
            status : order.status,
            updatedAt : order.updatedAt
        }
    }

}
