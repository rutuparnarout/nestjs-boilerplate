import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Address } from './entity/address.entity';
import { UserRepo } from './user.repo';
import { UserFacade } from './user.facade';

@Module({
    imports: [TypeOrmModule.forFeature([User, Address])],
    controllers: [UserController],
    providers: [UserFacade, UserService, UserRepo, Logger],
    exports: [UserService]
})
export class UserModule {}
