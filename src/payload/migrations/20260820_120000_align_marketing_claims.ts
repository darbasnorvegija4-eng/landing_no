import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "calculator_renewal_per_sqm" = 750,
      "hero_image_url" = '/gallery/marketing/hero-finished-roof-v2.webp',
      "about_image_url" = '/gallery/marketing/about-roof-specialist-v2.webp',
      "new_roof_image_url" = '/gallery/marketing/new-roof-installation-v2.webp',
      "copy_meta_description_no" = 'Takvask fra 99 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Gratis befaring og opptil 10 års garanti.',
      "copy_meta_description_en" = 'Roof washing from NOK 99/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. Free inspection and up to 10-year warranty.',
      "copy_hero_badge_no" = 'Takvask fra 99 kr/m² + mva',
      "copy_hero_badge_en" = 'Roof cleaning from NOK 99/m² + VAT',
      "copy_services_subtitle_no" = 'Takvask fra 99 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva – med fast pris og tydelig plan.',
      "copy_services_subtitle_en" = 'Roof washing from NOK 99/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT – with fixed pricing and a clear plan.',
      "copy_calculator_cheaper_no" = 'I dette eksempelet er takfornying omtrent {percent} % rimeligere enn nytt tak',
      "copy_calculator_cheaper_en" = 'In this example, roof renewal is about {percent}% less expensive than a new roof',
      "copy_calculator_disclaimer_no" = 'Veiledende totalestimat som inkluderer typisk forarbeid, sikring og adkomst. Pakkeprisene er fra-priser. Nøyaktig pris fastsettes etter gratis befaring.',
      "copy_calculator_disclaimer_en" = 'Indicative total estimate including typical preparation, safety and access. Package prices are starting prices. The exact price is set after a free inspection.',
      "copy_references_note_no" = 'Bildene er dokumenterte arbeidsbilder fra ulike Takfornyelse-prosjekter. Før- og ettereksempler er ikke nødvendigvis samme tak eller samme kameravinkel.',
      "copy_references_note_en" = 'These are documented work photos from different Takfornyelse projects. Before and after examples do not necessarily show the same roof or camera angle.',
      "copy_references_comparison_hint_no" = 'Eksempel før · eksempel etter',
      "copy_references_comparison_hint_en" = 'Before example · after example',
      "updated_at" = now()
  `);

  await db.execute(sql`
    UPDATE "services" SET
      "description_no" = CASE "key"
        WHEN 'wash' THEN 'Fra 99 kr/m² + mva. Skånsom høytrykksvask som fjerner mose, alger og smuss uten å skade taksteinen.'
        ELSE "description_no" END,
      "description_en" = CASE "key"
        WHEN 'wash' THEN 'From NOK 99/m² + VAT. Gentle high-pressure washing that removes moss, algae and dirt without damaging the tiles.'
        ELSE "description_en" END,
      "updated_at" = now()
    WHERE "key" = 'wash'
  `);

  await db.execute(sql`
    UPDATE "faq" SET
      "answer_no" = 'Takvask koster fra 99 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Nøyaktig pris avhenger av takets størrelse, takstein og tilstand. Du får alltid fast pris etter gratis befaring.',
      "answer_en" = 'Roof washing costs from NOK 99/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. The exact price depends on roof size, tile type and condition. You always get a fixed price after a free inspection.',
      "updated_at" = now()
    WHERE "question_no" = 'Hva koster takrenovering?'
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "calculator_renewal_per_sqm" = 360,
      "hero_image_url" = '/gallery/takfornyelse/06-L-finished-house-roof.jpg',
      "about_image_url" = '/gallery/takfornyelse/04-L-worker-pressure-washing.jpg',
      "new_roof_image_url" = '/gallery/takfornyelse/12-S-finished-house-roof.jpg',
      "copy_meta_description_no" = 'Takvask fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Gratis befaring og opptil 10 års garanti.',
      "copy_meta_description_en" = 'Roof washing from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. Free inspection and up to 10-year warranty.',
      "copy_hero_badge_no" = '',
      "copy_hero_badge_en" = '',
      "copy_services_subtitle_no" = 'Takvask fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva – med fast pris og tydelig plan.',
      "copy_services_subtitle_en" = 'Roof washing from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT – with fixed pricing and a clear plan.',
      "copy_calculator_cheaper_no" = 'Takfornying kan i mange tilfeller koste opptil 70 % mindre enn nytt tak',
      "copy_calculator_cheaper_en" = 'Roof renewal can in many cases cost up to 70% less than a new roof',
      "copy_calculator_disclaimer_no" = 'Estimat for dette eksempelet. Nøyaktig pris avhenger av takets tilstand og valgt behandling. Du får tilbud etter gratis befaring.',
      "copy_calculator_disclaimer_en" = 'Estimate for this example. Exact price depends on roof condition and chosen treatment. You get a quote after a free inspection.',
      "copy_references_note_no" = '',
      "copy_references_note_en" = '',
      "copy_references_comparison_hint_no" = 'Venstre: før · Høyre: etter',
      "copy_references_comparison_hint_en" = 'Left: before · Right: after',
      "updated_at" = now()
  `);

  await db.execute(sql`
    UPDATE "services" SET
      "description_no" = 'Fra 100 kr/m² + mva. Skånsom høytrykksvask som fjerner mose, alger og smuss uten å skade taksteinen.',
      "description_en" = 'From NOK 100/m² + VAT. Gentle high-pressure washing that removes moss, algae and dirt without damaging the tiles.',
      "updated_at" = now()
    WHERE "key" = 'wash'
  `);

  await db.execute(sql`
    UPDATE "faq" SET
      "answer_no" = 'Takvask koster fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Nøyaktig pris avhenger av takets størrelse, takstein og tilstand. Du får alltid fast pris etter gratis befaring.',
      "answer_en" = 'Roof washing costs from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. The exact price depends on roof size, tile type and condition. You always get a fixed price after a free inspection.',
      "updated_at" = now()
    WHERE "question_no" = 'Hva koster takrenovering?'
  `);
}
