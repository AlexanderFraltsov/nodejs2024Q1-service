import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixFavorites1711299188935 implements MigrationInterface {
  name = 'FixFavorites1711299188935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorites_albums_album" ("favoritesId" character varying NOT NULL, "albumId" uuid NOT NULL, CONSTRAINT "PK_4caba2d65763821c7dd2db51558" PRIMARY KEY ("favoritesId", "albumId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31b327b5a4f89d2eb722968982" ON "favorites_albums_album" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ff0c3cde93d2bc8c23c2b72c3" ON "favorites_albums_album" ("albumId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_artists_artist" ("favoritesId" character varying NOT NULL, "artistId" uuid NOT NULL, CONSTRAINT "PK_a6aeacbfda85e00ccc625a84474" PRIMARY KEY ("favoritesId", "artistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_663b6278dbd0f67925d1238ade" ON "favorites_artists_artist" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a44f2a39bd14c72dfd8ad7933" ON "favorites_artists_artist" ("artistId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "favorites_tracks_track" ("favoritesId" character varying NOT NULL, "trackId" uuid NOT NULL, CONSTRAINT "PK_613647698cfa077425b1047e1a6" PRIMARY KEY ("favoritesId", "trackId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3ecf4f6fab33cc9611b9e40292" ON "favorites_tracks_track" ("favoritesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fee451584feed445b14adb7fb8" ON "favorites_tracks_track" ("trackId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "PK_2dff4cb75f7c05fd4d251fdd383"`,
    );
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "key"`);
    await queryRunner.query(`DROP TYPE "public"."favorites_key_enum"`);
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "ids"`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "id" character varying NOT NULL DEFAULT 'key'`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_31b327b5a4f89d2eb7229689829" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" ADD CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_663b6278dbd0f67925d1238ade2" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" ADD CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" ADD CONSTRAINT "FK_fee451584feed445b14adb7fb80" FOREIGN KEY ("trackId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_fee451584feed445b14adb7fb80"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_tracks_track" DROP CONSTRAINT "FK_3ecf4f6fab33cc9611b9e402927"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_2a44f2a39bd14c72dfd8ad7933b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_artists_artist" DROP CONSTRAINT "FK_663b6278dbd0f67925d1238ade2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_4ff0c3cde93d2bc8c23c2b72c3f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites_albums_album" DROP CONSTRAINT "FK_31b327b5a4f89d2eb7229689829"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" DROP CONSTRAINT "PK_890818d27523748dd36a4d1bdc8"`,
    );
    await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "ids" uuid array NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."favorites_key_enum" AS ENUM('albums', 'artists', 'tracks')`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD "key" "public"."favorites_key_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorites" ADD CONSTRAINT "PK_2dff4cb75f7c05fd4d251fdd383" PRIMARY KEY ("key")`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fee451584feed445b14adb7fb8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3ecf4f6fab33cc9611b9e40292"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_tracks_track"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a44f2a39bd14c72dfd8ad7933"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_663b6278dbd0f67925d1238ade"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_artists_artist"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ff0c3cde93d2bc8c23c2b72c3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31b327b5a4f89d2eb722968982"`,
    );
    await queryRunner.query(`DROP TABLE "favorites_albums_album"`);
  }
}
