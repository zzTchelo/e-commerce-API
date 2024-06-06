import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { ProductEntity } from "./entities/product.entity";

config();

const configService = new ConfigService();

const dataSourceOptions : DataSourceOptions = {
    type : 'postgres',
    url : configService.get<string>('DB_URL'),
    host : configService.get<string>('DB_HOST'),
    port : configService.get<number>('DB_PORT'),
    database : configService.get<string>('DB_NAME'),
    username : configService.get<string>('DB_USER'),
    password : configService.get<string>('DB_PASSWORD'),
    entities : [ProductEntity],
    migrations : [__dirname + '/migrations/*.ts'],
    synchronize : false,
    ssl : true
}

export default new DataSource(
    dataSourceOptions
);