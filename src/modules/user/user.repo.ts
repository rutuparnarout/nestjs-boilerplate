import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Address } from './entity/address.entity';

@Injectable()
export class UserRepo {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>
    ) {}

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async updateUser(userId: number, user: User) {
        return await this.userRepository.update(userId, user);
    }

    async getUser(userId: number) {
        return await this.userRepository.findOne(userId, { relations: ['address'] });
    }

    async createAddress(userAddress: Address[]) {
        return await this.addressRepository.save(userAddress);
    }

    async getUserByUserName(userName: string) {
        return await this.userRepository.findOne({ where: { userName: userName } });
    }
}
