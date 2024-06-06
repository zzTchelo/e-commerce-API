import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('uuid')
    id ?: string;

    @Column({type : 'varchar'})
    username : string;

    @Column({type : 'varchar'})
    email : string;

    @Column({type : 'varchar'})
    password : string;

    @Column({type : 'boolean'})
    isActive : boolean;
}