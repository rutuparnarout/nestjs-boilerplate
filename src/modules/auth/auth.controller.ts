import { Controller, UseGuards, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //@UseGuards(AuthGuard('local'))
    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        const l = await this.authService.validateUser(loginUserDto.userName, loginUserDto.password);
        return { data: l, message: 'User logged in successfully.' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile/:userId')
    async getProfile(@Param('userId') userId: number) {
        return 'user returned';
    }
}
