import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "calculator_renewal_per_sqm" = 360,
      "copy_meta_description_no" = 'Takvask fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Gratis befaring og opptil 10 års garanti.',
      "copy_meta_description_en" = 'Roof washing from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. Free inspection and up to 10-year warranty.',
      "copy_services_subtitle_no" = 'Takvask fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva – med fast pris og tydelig plan.',
      "copy_services_subtitle_en" = 'Roof washing from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT – with fixed pricing and a clear plan.',
      "updated_at" = now()
  `);

  await db.execute(sql`
    UPDATE "services" SET
      "description_no" = CASE "key"
        WHEN 'wash' THEN 'Fra 100 kr/m² + mva. Skånsom høytrykksvask som fjerner mose, alger og smuss uten å skade taksteinen.'
        WHEN 'impregnation' THEN 'Fra 40 kr/m² + mva. Etter vask beskytter vi steinen med NowoCoat/Surfatech – mot fukt og ny mosevekst i mange år.'
        WHEN 'paint' THEN 'Fra 220 kr/m² + mva. Spesialmaling i ønsket farge gir varig beskyttelse og et tak som ser nytt ut.'
        ELSE "description_no" END,
      "description_en" = CASE "key"
        WHEN 'wash' THEN 'From NOK 100/m² + VAT. Gentle high-pressure washing that removes moss, algae and dirt without damaging the tiles.'
        WHEN 'impregnation' THEN 'From NOK 40/m² + VAT. After washing we protect the tiles with NowoCoat/Surfatech – against moisture and new moss for years.'
        WHEN 'paint' THEN 'From NOK 220/m² + VAT. Specialist coating in your chosen colour gives lasting protection and a roof that looks new.'
        ELSE "description_en" END,
      "updated_at" = now()
    WHERE "key" IN ('wash', 'impregnation', 'paint')
  `);

  await db.execute(sql`
    UPDATE "faq" SET
      "answer_no" = 'Takvask koster fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Nøyaktig pris avhenger av takets størrelse, takstein og tilstand. Du får alltid fast pris etter gratis befaring.',
      "answer_en" = 'Roof washing costs from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. The exact price depends on roof size, tile type and condition. You always get a fixed price after a free inspection.',
      "updated_at" = now()
    WHERE "question_no" = 'Hva koster takrenovering?'
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings" SET "calculator_renewal_per_sqm" = 750, "updated_at" = now()
  `);
}
