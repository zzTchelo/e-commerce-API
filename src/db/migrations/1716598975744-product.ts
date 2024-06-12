import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1716598975744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`
            CREATE TABLE product (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                isAvailable BOOLEAN DEFAULT TRUE,
                isHilight BOOLEAN DEFAULT false,
                CONSTRAINT product_pk PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS products;`);
    }

}
