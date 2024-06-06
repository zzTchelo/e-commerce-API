import { MigrationInterface, QueryRunner } from "typeorm";

export class Sale1716698002730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`
            CREATE TABLE sales (
                id UUID NOT NULL DEFAULT uuid_generate_v4(),
                user_id UUID NOT NULL,
                total_price NUMERIC(10,2) NOT NULL,
                status INTEGER NOT NULL,
                updated_at TIMESTAMP NOT NULL,
                CONSTRAINT sale_pk PRIMARY KEY (id)
            );    
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS sales;`);
    }
}
