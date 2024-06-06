import { IsUUID, IsDecimal, IsPositive, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { User } from '../user/user';

enum SaleStatus{
    Pending,
    Processing,
    On_the_way,
    Completed,
    Cancelled
}

export class Sale {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsUUID()
    userId: string;

    @IsDecimal()
    @IsPositive()
    totalPrice: number;

    @IsEnum(SaleStatus)
    status : SaleStatus;

    @IsDateString()
    updatedAt: Date;
}

export class findSaleByParams {
    @IsUUID()
    id: string;

    @IsUUID()
    userId: string;

    @IsEnum(SaleStatus)
    status : SaleStatus;
}

export class saleRouteParams{
    @IsUUID()
    id : string
}