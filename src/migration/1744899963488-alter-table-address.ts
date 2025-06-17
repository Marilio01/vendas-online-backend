import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAddressAddStreetAndNeighborhood1678886400000 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."address"
            ADD COLUMN "street" character varying,
            ADD COLUMN "neighborhood" character varying;
        `);

        await queryRunner.query(`
            ALTER TABLE "public"."address"
            ALTER COLUMN "street" SET NOT NULL,
            ALTER COLUMN "neighborhood" SET NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "public"."address"
            DROP COLUMN "street",
            DROP COLUMN "neighborhood";
        `);
    }

}