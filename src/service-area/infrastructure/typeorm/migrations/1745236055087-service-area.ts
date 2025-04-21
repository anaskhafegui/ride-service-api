import { MigrationInterface, QueryRunner } from 'typeorm';

export class ServiceArea1745236055087 implements MigrationInterface {
  name = 'ServiceArea1745236055087';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."service_areas_pricedependon_enum" AS ENUM('km_range', 'km_price')`,
    );
    await queryRunner.query(
      `ALTER TABLE "service_areas" ADD "priceDependOn" "public"."service_areas_pricedependon_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "service_areas" DROP COLUMN "priceDependOn"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."service_areas_pricedependon_enum"`,
    );
  }
}
