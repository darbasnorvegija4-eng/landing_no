import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "leads" ALTER COLUMN "phone" DROP NOT NULL`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "leads"
    SET "phone" = ''
    WHERE "phone" IS NULL
  `);
  await db.execute(sql`ALTER TABLE "leads" ALTER COLUMN "phone" SET NOT NULL`);
}
