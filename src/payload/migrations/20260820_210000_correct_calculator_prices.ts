import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "calculator_new_roof_per_sqm" = 2500,
      "calculator_renewal_per_sqm" = 421.25,
      "copy_calculator_subtitle_no" = 'Sammenlign en veiledende markedspris for nytt tak med vår fra-pris for komplett takfornying.',
      "copy_calculator_subtitle_en" = 'Compare an indicative market price for a new roof with our starting price for complete roof renewal.',
      "copy_calculator_hint_no" = 'Velg beregnet takflate. Takflaten er vanligvis større enn boligens grunnflate.',
      "copy_calculator_hint_en" = 'Select the estimated roof surface. The roof surface is usually larger than the home''s floor area.',
      "copy_calculator_size_label_no" = 'Takflate',
      "copy_calculator_size_label_en" = 'Roof surface',
      "copy_calculator_new_roof_no" = 'Nytt tak – markedsestimat',
      "copy_calculator_new_roof_en" = 'New roof – market estimate',
      "copy_calculator_renewal_no" = 'Komplett takfornying – fra',
      "copy_calculator_renewal_en" = 'Complete roof renewal – from',
      "copy_calculator_you_save_no" = 'Estimert prisforskjell',
      "copy_calculator_you_save_en" = 'Estimated price difference',
      "copy_calculator_cheaper_no" = 'I dette regneeksempelet er takfornying omtrent {percent} % rimeligere',
      "copy_calculator_cheaper_en" = 'In this example, roof renewal is approximately {percent}% less expensive',
      "copy_calculator_disclaimer_no" = 'Alle beløp er inkludert mva. Nytt tak beregnes med et veiledende markedsestimat på 2 500 kr/m². Komplett takfornying beregnes fra 421,25 kr/m² for vask, impregnering og maling. Tilstand, helling, adkomst og sikring kan påvirke endelig pris, som fastsettes etter gratis befaring.',
      "copy_calculator_disclaimer_en" = 'All amounts include VAT. A new roof is calculated using an indicative market estimate of NOK 2,500/m². Complete roof renewal is calculated from NOK 421.25/m² for cleaning, impregnation and painting. Condition, pitch, access and safety requirements may affect the final price, which is set after a free inspection.',
      "updated_at" = now()
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings"
    SET
      "calculator_new_roof_per_sqm" = 2500,
      "calculator_renewal_per_sqm" = 750,
      "copy_calculator_subtitle_no" = 'Sammenlign estimert pris for takfornying med å legge helt nytt tak.',
      "copy_calculator_subtitle_en" = 'Compare an estimated price for roof renewal with installing a completely new roof.',
      "copy_calculator_hint_no" = 'Dra for å justere takets størrelse',
      "copy_calculator_hint_en" = 'Drag to adjust roof size',
      "copy_calculator_size_label_no" = 'Takets størrelse',
      "copy_calculator_size_label_en" = 'Roof size',
      "copy_calculator_new_roof_no" = 'Nytt tak',
      "copy_calculator_new_roof_en" = 'New roof',
      "copy_calculator_renewal_no" = 'Takfornying',
      "copy_calculator_renewal_en" = 'Roof renewal',
      "copy_calculator_you_save_no" = 'Estimert besparelse',
      "copy_calculator_you_save_en" = 'Estimated savings',
      "copy_calculator_cheaper_no" = 'I dette eksempelet er takfornying omtrent {percent} % rimeligere enn nytt tak',
      "copy_calculator_cheaper_en" = 'In this example, roof renewal is about {percent}% less expensive than a new roof',
      "copy_calculator_disclaimer_no" = 'Veiledende totalestimat som inkluderer typisk forarbeid, sikring og adkomst. Pakkeprisene er fra-priser. Nøyaktig pris fastsettes etter gratis befaring.',
      "copy_calculator_disclaimer_en" = 'Indicative total estimate including typical preparation, safety and access. Package prices are starting prices. The exact price is set after a free inspection.',
      "updated_at" = now()
  `);
}
