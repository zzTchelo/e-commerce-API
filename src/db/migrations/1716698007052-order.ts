import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1716698007052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`
            CREATE TABLE orders (
                id UUID DEFAULT uuid_generate_v4(),
                sale_id UUID NOT NULL,
                product_id UUID NOT NULL,
                quantity NUMERIC NOT NULL,
                price NUMERIC(10,2) NOT NULL,
                status INTEGER NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                CONSTRAINT order_pk PRIMARY KEY (id)
            );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS orders;`);
    }

}
