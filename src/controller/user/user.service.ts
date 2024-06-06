import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ){}

    async create(user : User){

        const searchParams : FindOptionsWhere<UserEntity> = {}

        if(user.username)
            searchParams.username = user.username

        if(user.email)
            searchParams.email = user.email

        const foundUser = await this.userRepository.findOne({
            where : searchParams
        });

        if(foundUser)
            throw new HttpException("User od e-mail already exists.", HttpStatus.BAD_REQUEST)

        const userToSave : UserEntity= {
            username : user.username,
            email : user.email,
            password : user.password,
            isActive : true
        }
        
        await this.userRepository.save(userToSave);
    }

    async delete(user : string){
        await this.userRepository.delete(user);
    }

}
