import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceArea1745203279792 implements MigrationInterface {
    name = 'ServiceArea1745203279792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "polygon" geometry(Polygon,4326) NOT NULL, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_cdda4e5b616d5be3c81d15fd756" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "service_area_name_unique" ON "service_areas" ("name") `);
        await queryRunner.query(`CREATE INDEX "service_area_polygon_gix" ON "service_areas" USING GiST ("polygon") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."service_area_polygon_gix"`);
        await queryRunner.query(`DROP INDEX "public"."service_area_name_unique"`);
        await queryRunner.query(`DROP TABLE "service_areas"`);
    }

}
