import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';


export abstract class AbstarctEntity {
    @PrimaryGeneratedColumn()
    protected id: number;

    @CreateDateColumn()
    createdAt: string;

    @Column({ default: "current_user" })
    protected createdBy: string;

    @UpdateDateColumn()
    updatedAt: string;

    @Column({ default: "current_user" })
    protected updatedBy: string;
}