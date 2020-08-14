import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUserName(username);
        if (user === null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const match = await bcrypt.compare(pass, user.password);
        if (!match) {
            throw new HttpException('Invalid password.', HttpStatus.EXPECTATION_FAILED);
        }
        const { password, ...result } = user;
        return await this.login(result);
    }

    private async login(user: any) {
        const payload = { username: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
