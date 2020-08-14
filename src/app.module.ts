import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/entity/user.entity';
import { Address } from './modules/user/entity/address.entity';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import app_root from 'app-root-path';

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike())
                }),
                new winston.transports.File({
                    level: 'error',
                    format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
                    filename: `${app_root}/logs/error.log`,
                    handleExceptions: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                new winston.transports.File({
                    level: 'info',
                    format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
                    filename: `${app_root}/logs/info.log`,
                    handleExceptions: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                new winston.transports.File({
                    format: winston.format.combine(winston.format.timestamp(), nestWinstonModuleUtilities.format.nestLike()),
                    filename: `${app_root}/logs/app.log`,
                    handleExceptions: true,
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                })
                // other transports...
            ]
            // other options
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: 'nest_ddd',
            entities: [User, Address],
            synchronize: true
        }),
        UserModule,
        AuthModule
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ]
})
export class AppModule {
    constructor(private connection: Connection) {}
}
