import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory : async (configService : ConfigService) => {
                //console.log('DB_URL:', configService.get<string>('DB_URL'));
                //console.log('DB_PORT:', configService.get<number>('DB_PORT'));
                //console.log('DB_NAME:', configService.get<string>('DB_NAME'));
                //console.log('DB_USER:', configService.get<string>('DB_USER'));
                //console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));

                return {
                type : 'postgres',
                    url : configService.get<string>('DB_URL'),
                    host : configService.get<string>('DB_HOST'),
                    port : configService.get<number>('DB_PORT'),
                    database : configService.get<string>('DB_NAME'),
                    username : configService.get<string>('DB_USER'),
                    password : configService.get<string>('DB_PASSWORD'),
                    entities : [__dirname + '/entities/**'],
                    migrations : [__dirname + '/migrations/*.ts'],
                    synchronize : false,
                    ssl : true
                }
            },
            inject : [ConfigService]
        })
    ]
})
export class DbModule {}
