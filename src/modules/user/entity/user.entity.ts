import { Entity, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AbstarctEntity } from 'src/modules/shared/entity/abstract.entity';
import { Address } from './address.entity';

@Entity()
export class User extends AbstarctEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    contactNumber: string;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(
        type => Address,
        address => address.user
    )
    address: Address[];

    private constructor() {
        super();
    }
    // private constructor(firstName: string, lastName: string, contactNumber: string, age: number, email: string) {
    //     super();
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.age = age;
    //     this.contactNumber = contactNumber;
    //     this.email = email;
    // }

    // static createUser(firstName: string, lastName: string, contactNumber: string, age: number, email: string) {
    //     const user = new User(firstName, lastName, contactNumber, age, email);
    //     return user;
    // }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 8);
    }

    static createUser(
        firstName: string,
        lastName: string,
        contactNumber: string,
        age: number,
        email: string,
        userName: string,
        password: string,
        address: Address[]
    ) {
        const user = new User();
        user.age = age;
        user.contactNumber = contactNumber;
        user.firstName = firstName;
        user.email = email;
        user.lastName = lastName;
        user.userName = userName;
        user.password = password;
        user.address = address;
        return user;
    }

    updateUser(id: number, firstName: string, lastName: string, contactNumber: string, age: number, email: string) {
        this.id = id;
        this.age = age;
        this.contactNumber = contactNumber;
        this.firstName = firstName;
        this.email = email;
        this.lastName = lastName;
        return this;
    }
}
