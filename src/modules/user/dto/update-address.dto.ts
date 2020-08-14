import { ApiProperty } from "@nestjs/swagger";

export class UpdateAddressDto {

    @ApiProperty()
    houseNumber: string;

    @ApiProperty()
    locality: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    state: string;

    @ApiProperty()
    country: string;

    @ApiProperty()
    countryCode: string;

}