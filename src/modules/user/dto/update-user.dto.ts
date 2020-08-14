import { ApiProperty } from '@nestjs/swagger';
import { UpdateAddressDto } from './update-address.dto';

export class UpdateUserDto {

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    contactNumber: string;

    @ApiProperty()
    age: number;

    @ApiProperty()
    email: string;

    @ApiProperty({ type: [UpdateAddressDto] })
    address: UpdateAddressDto[];

}