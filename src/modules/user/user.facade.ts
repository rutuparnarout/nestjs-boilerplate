import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserFacade {
    constructor(private readonly userService: UserService) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(userId, updateUserDto);
    }

    async getUser(userId: number) {
        return await this.userService.getUser(userId);
    }

    async getUserByUserName(userName: string) {
        return await this.userService.getUserByUserName(userName);
    }
}
