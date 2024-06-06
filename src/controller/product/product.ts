import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class Product{
    @IsUUID()
    @IsOptional()
    id: string;
    
    @IsString()
    name: string;
    
    @IsString()
    description: string;
    
    @IsNumber()
    @IsPositive()
    price: number;
    
    @IsBoolean()
    isAvailable: boolean;
    
    @IsBoolean()
    isHilight: boolean;
    
    //@IsNumber()
    //rating: number
}

export class findProductByParams{
    @IsString()
    name: string;
    
    @IsString()
    description: string;
}

export class productRouteParams{
    @IsUUID()
    id : string
}