import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsAlphanumeric } from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export class CreateUserDto {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    contactNumber: string;

    @ApiProperty()
    age: number;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    userName: string;

    @IsAlphanumeric()
    @ApiProperty()
    password: string;

    @ApiProperty({ type: [CreateAddressDto] })
    address: CreateAddressDto[];
}
