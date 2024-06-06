import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { User } from './user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService : UserService
    ){}

    @Post('')
    async post(@Body() user : User){
        await this.userService.create(user);
    }

    @Delete('/:id')
    async delete(@Param('id') id : string){
        await this.userService.delete(id);
    }

}
