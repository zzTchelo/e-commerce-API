import { MigrationInterface, QueryRunner } from "typeorm";

export class User1716695326483 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`
            CREATE TABLE users (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                username VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                CONSTRAINT user_pk PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    }

}
