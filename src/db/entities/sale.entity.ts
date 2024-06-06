import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({name : 'sale'})
export class SaleEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type : 'varchar'})
    userId: string;

    @Column({type : 'decimal'})
    totalPrice: number;

    @Column({ type: 'integer'})
    status : number;

    @Column({type : 'timestamptz', name : 'date_update'})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.id)
    @JoinColumn({ name: 'userId' })
    user : UserEntity;
}
