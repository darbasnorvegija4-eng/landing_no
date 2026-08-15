import * as migration_0 from "./20260727_000000_baseline";
import * as migration_1 from "./20260727_120000_privacy_consent";
import * as migration_2 from "./20260727_130000_admin_powers";
import * as migration_3 from "./20260727_140000_drafts_roles";
import * as migration_4 from "./20260727_150000_pages_posts_redirects";
import * as migration_5 from "./20260813_120000_contact_choice";
import * as migration_6 from "./20260814_120000_update_service_prices";
import * as migration_7 from "./20260815_120000_lead_attribution";

export const migrations = [
  {
    up: migration_0.up,
    down: migration_0.down,
    name: "20260727_000000_baseline",
  },
  {
    up: migration_1.up,
    down: migration_1.down,
    name: "20260727_120000_privacy_consent",
  },
  {
    up: migration_2.up,
    down: migration_2.down,
    name: "20260727_130000_admin_powers",
  },
  {
    up: migration_3.up,
    down: migration_3.down,
    name: "20260727_140000_drafts_roles",
  },
  {
    up: migration_4.up,
    down: migration_4.down,
    name: "20260727_150000_pages_posts_redirects",
  },
  {
    up: migration_5.up,
    down: migration_5.down,
    name: "20260813_120000_contact_choice",
  },
  {
    up: migration_6.up,
    down: migration_6.down,
    name: "20260814_120000_update_service_prices",
  },
  {
    up: migration_7.up,
    down: migration_7.down,
    name: "20260815_120000_lead_attribution",
  },
];
