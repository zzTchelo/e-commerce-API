import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID } from "class-validator";

export class User{
    @IsUUID()
    @IsOptional()
    id : string;

    @IsString()
    username : string;

    @IsEmail()
    email : string;

    @IsString()
    password : string;

    @IsBoolean()
    isActive : boolean;
}