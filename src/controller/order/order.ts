import { IsUUID, IsDecimal, IsPositive, IsDateString, IsEnum, IsOptional, IsNumber } from 'class-validator';

export enum OrderStatus {
    Pending,
    Processing,
    Completed,
    Cancelled
}

export class Order {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    saleId: string;

    @IsUUID()
    productId: string;

    @IsNumber()
    @IsPositive()
    quantity: number;

    @IsDecimal()
    @IsPositive()
    price: number;

    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsDateString()
    updatedAt: Date;
}

export class findOrderByParams {
    @IsUUID()
    id: string;

    @IsUUID()
    saleId: string;

    @IsUUID()
    productId: string;

    @IsEnum(OrderStatus)
    status: OrderStatus;
}

export class orderRouteParam {
    @IsUUID()
    id: string;
}