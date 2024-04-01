import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFavorites1711294908347 implements MigrationInterface {
  name = 'AddFavorites1711294908347';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."favorites_key_enum" AS ENUM('albums', 'artists', 'tracks')`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites" ("key" "public"."favorites_key_enum" NOT NULL, "ids" uuid array NOT NULL, CONSTRAINT "PK_2dff4cb75f7c05fd4d251fdd383" PRIMARY KEY ("key"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TYPE "public"."favorites_key_enum"`);
  }
}
