import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { SaleEntity } from "./sale.entity";
import { ProductEntity } from "./product.entity";

@Entity({ name: 'order' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'uuid' })
    saleId: string;

    @Column({ type: 'uuid' })
    productId: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ type: 'decimal' })
    price: number;

    @Column({ type: 'integer' })
    status: number;

    @Column({ type: 'timestamptz', name: 'date_update' })
    updatedAt: Date;

    @ManyToOne(() => SaleEntity, sale => sale.id)
    @JoinColumn({ name: 'saleId' })
    sale: SaleEntity;

    @ManyToOne(() => ProductEntity, product => product.id)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;
}
