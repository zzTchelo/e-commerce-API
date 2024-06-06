import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'product'})
export class ProductEntity{
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'decimal'})
    price: number;

    @Column({type: 'boolean'})
    isAvailable: boolean;

    @Column({type: 'boolean'})
    isHilight: boolean;

    //@Column({type: 'integer'})
    //rating: number
}