import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserFacade } from './user.facade';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userFacade: UserFacade) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const user = await this.userFacade.createUser(createUserDto);
        return { data: user, message: 'User created successfully.' };
    }

    @Put(':userId')
    async updateUser(@Param('userId') userId: number, @Body() updateUserDto: UpdateUserDto) {
        const user = await this.userFacade.updateUser(userId, updateUserDto);
        return { data: user, message: 'User updated successfully.' };
    }

    @Get(':userId')
    async getUser(@Param('userId') userId: number) {
        const user = await this.userFacade.getUser(userId);
        return { data: user, message: 'User retrived successfully.' };
    }
}
