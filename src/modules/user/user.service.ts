import { Injectable, Inject, Logger, LoggerService } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepo } from './user.repo';
import { Address } from './entity/address.entity';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepo, @Inject(Logger) private readonly logger: LoggerService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        this.logger.log('This is my first log');
        const userAddress: Address[] = [];
        createUserDto.address.forEach(a => {
            userAddress.push(Address.createAddress(a.houseNumber, a.locality, a.city, a.state, a.country, a.countryCode));
        });
        await this.userRepo.createAddress(userAddress);
        const userObj = User.createUser(
            createUserDto.firstName,
            createUserDto.lastName,
            createUserDto.contactNumber,
            createUserDto.age,
            createUserDto.email,
            createUserDto.userName,
            createUserDto.password,
            userAddress
        );
        const user = await this.userRepo.createUser(userObj);
        return user;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.userRepo.getUser(userId);
        user.updateUser(userId, updateUserDto.firstName, updateUserDto.lastName, updateUserDto.contactNumber, updateUserDto.age, updateUserDto.email);
        await this.userRepo.updateUser(userId, user);
        return user;
    }

    async getUser(userId: number) {
        const user = await this.userRepo.getUser(userId);
        return user;
    }

    async getUserByUserName(userName: string) {
        return await this.userRepo.getUserByUserName(userName);
    }
}
