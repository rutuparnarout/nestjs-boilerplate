import { Entity, Column, BeforeInsert, BeforeUpdate, ManyToOne } from 'typeorm';
import { AbstarctEntity } from 'src/modules/shared/entity/abstract.entity';
import { User } from './user.entity';

@Entity()
export class Address extends AbstarctEntity {

    @Column()
    private houseNumber: string;

    @Column()
    private locality: string;

    @Column()
    private city: string;

    @Column()
    private state: string;

    @Column()
    private country: string;

    @Column()
    private countryCode: string;

    @Column({ default: true })
    private isActive: boolean;

    @ManyToOne(type => User, user => user.address)
    user: User;

    private constructor() {
        super();
    }

    static createAddress(houseNumber: string, locality: string, city: string, state: string, country: string, countryCode: string) {
        const address = new Address();
        address.houseNumber = houseNumber;
        address.locality = locality;
        address.city = city;
        address.state = state;
        address.country = country;
        address.countryCode = countryCode;
        return address;
    }
}