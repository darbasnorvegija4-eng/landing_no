export type LocalizedString = { no: string; en: string };

export const products = [
  {
    id: "nowocoat",
    name: "NowoCoat Roof Coating",
    category: { no: "Takmaling", en: "Roof coating" },
    description: {
      no: "Profesjonell, vannbasert hybridmaling med tre bindemidler for overlegen heft til betongtakstein og fibersement. Lysekte, diffusjonsåpen, værstabil og elastisk – med Svanemerke.",
      en: "Professional water-based hybrid coating with three binders for superior adhesion to concrete tiles and fibre cement. Lightfast, vapour-open, weather-stable and elastic – Swan-labelled.",
    },
    badges: {
      no: ["Svanemerket", "UV-stabil", "Elastisk", "Diffusjonsåpen"],
      en: ["Swan ecolabel", "UV-stable", "Elastic", "Vapour-open"],
    },
  },
  {
    id: "surfapore",
    name: "SurfaPore C",
    category: {
      no: "Impregnering – diffusjonsåpen",
      en: "Impregnation – vapour-open",
    },
    description: {
      no: "Vannbasert nanoimpregnering uten farlige tilsetninger. Skaper en usynlig, vannavvisende barriere uten film – underlaget puster fritt mens fukt og smuss holdes ute.",
      en: "Water-based nano impregnation without harmful additives. Creates an invisible water-repellent barrier without a film – the substrate breathes while moisture and dirt stay out.",
    },
    badges: {
      no: [
        "Nanoteknologi",
        "Diffusjonsåpen",
        "Usynlig beskyttelse",
        "Miljøvennlig",
      ],
      en: [
        "Nanotechnology",
        "Vapour-open",
        "Invisible protection",
        "Eco-friendly",
      ],
    },
  },
  {
    id: "nowodry",
    name: "NowoDry WB",
    category: {
      no: "Impregnering – vannavvisende",
      en: "Impregnation – water-repellent",
    },
    description: {
      no: "Kraftig vannbasert impregnering for langvarig beskyttelse mot fukt. Ideell for takstein, heller og murverk der maksimal vannavvisning og frostbeskyttelse trengs.",
      en: "Strong water-based impregnation for lasting moisture protection. Ideal for tiles, paving and masonry where maximum water repellence and frost protection are needed.",
    },
    badges: {
      no: [
        "Sterk vannavvisning",
        "Frostbeskyttelse",
        "Langvarig",
        "Enkel påføring",
      ],
      en: [
        "Strong water repellence",
        "Frost protection",
        "Long-lasting",
        "Easy to apply",
      ],
    },
  },
  {
    id: "nowoclean",
    name: "NowoClean",
    category: { no: "Rengjøring", en: "Cleaning" },
    description: {
      no: "Effektivt rengjøringsmiddel for skånsom vask av papp-, skifer- og shingeltak. Fjerner smuss og alger uten å skade overflaten – og gir godt underlag for videre behandling.",
      en: "Effective cleaner for gentle washing of felt, slate and shingle roofs. Removes dirt and algae without damaging the surface – and prepares for further treatment.",
    },
    badges: {
      no: [
        "Skånsom vask",
        "Fjerner alger",
        "For alle taktyper",
        "Biologisk nedbrytbar",
      ],
      en: ["Gentle wash", "Removes algae", "All roof types", "Biodegradable"],
    },
  },
] as const;

export const faqItems = [
  {
    id: "cost",
    question: {
      no: "Hva koster takrenovering?",
      en: "What does roof renovation cost?",
    },
    answer: {
      no: "Takvask koster fra 100 kr/m² + mva, impregnering fra 40 kr/m² + mva og takmaling fra 220 kr/m² + mva. Nøyaktig pris avhenger av takets størrelse, takstein og tilstand. Du får alltid fast pris etter gratis befaring.",
      en: "Roof washing costs from NOK 100/m² + VAT, impregnation from NOK 40/m² + VAT and roof painting from NOK 220/m² + VAT. The exact price depends on roof size, tile type and condition. You always get a fixed price after a free inspection.",
    },
  },
  {
    id: "impregnate",
    question: {
      no: "Hvordan impregneres tak?",
      en: "How is a roof impregnated?",
    },
    answer: {
      no: "Etter grundig vask påføres impregnering som trekker inn i steinen. Den beskytter mot fukt og mose uten å tette damp – taket kan fortsatt puste.",
      en: "After a thorough wash we apply impregnation that soaks into the tiles. It protects against moisture and moss without sealing vapour – the roof can still breathe.",
    },
  },
  {
    id: "duration",
    question: {
      no: "Hvor lang tid tar takfornying?",
      en: "How long does roof renewal take?",
    },
    answer: {
      no: "De fleste boligtak blir ferdige på 1–3 dager, avhengig av vær og størrelse. Store borettslag planlegges over flere etapper.",
      en: "Most homes are finished in 1–3 days, depending on weather and size. Larger housing associations are planned in stages.",
    },
  },
  {
    id: "difference",
    question: {
      no: "Hva er forskjellen på takfornyelse og takfornying?",
      en: "What is the difference between roof renewal terms?",
    },
    answer: {
      no: "Takfornyelse og takfornying beskriver samme tjeneste: vask, impregnering og maling av eksisterende tak – nytt liv uten full omlegging.",
      en: "Both terms describe the same service: washing, impregnating and painting an existing roof – new life without a full replacement.",
    },
  },
  {
    id: "experience",
    question: {
      no: "Har dere erfaring med takfornying?",
      en: "Do you have experience with roof renewal?",
    },
    answer: {
      no: "Ja. Vi har gjennomført over 100 takprosjekter, med dedikerte team, dokumenterte metoder og opptil 10 års produkt- og utførelsesgaranti (avhengig av behandling og takets tilstand).",
      en: "Yes. We have completed over 100 roof projects, with dedicated teams, proven methods and up to 10 years’ product and workmanship warranty (depending on treatment and roof condition).",
    },
  },
] as const;

export const projects = [
  {
    id: "takvask-for-og-etter",
    title: {
      no: "Takvask – før, under og etter",
      en: "Roof washing – before, during and after",
    },
    stages: [
      {
        label: "before" as const,
        image: "/gallery/takfornyelse/01-L-before-heavy-moss.jpg",
        caption: {
          no: "Skitten og mosegrodd takstein før vask",
          en: "Dirty, moss-covered roof tiles before washing",
        },
      },
      {
        label: "after" as const,
        image: "/gallery/takfornyelse/05-L-after-clean-roof.jpg",
        caption: {
          no: "Ren takflate etter grundig vask",
          en: "Clean roof surface after thorough washing",
        },
      },
      {
        label: "before" as const,
        image: "/gallery/takfornyelse/02-L-before-tile-detail.jpg",
        caption: {
          no: "Mose og begroing mellom taksteinene før behandling",
          en: "Moss and organic growth between tiles before treatment",
        },
      },
      {
        label: "during" as const,
        image: "/gallery/takfornyelse/04-L-worker-pressure-washing.jpg",
        caption: {
          no: "Takvask under utførelse",
          en: "Roof washing in progress",
        },
      },
    ],
  },
  {
    id: "takmaling-for-og-etter",
    title: {
      no: "Takmaling – tydelig før og etter",
      en: "Roof painting – a clear before and after",
    },
    stages: [
      {
        label: "during" as const,
        image: "/gallery/takfornyelse/03-L-before-after-painting.jpg",
        caption: {
          no: "Tydelig kontrast mellom ubehandlet og malt tak",
          en: "Clear contrast between untreated and painted roof tiles",
        },
      },
      {
        label: "during" as const,
        image: "/gallery/takfornyelse/08-S-before-after-washing-worker.jpg",
        caption: {
          no: "Rengjøring og klargjøring før videre behandling",
          en: "Cleaning and preparation before further treatment",
        },
      },
      {
        label: "during" as const,
        image: "/gallery/takfornyelse/09-S-before-after-painting.jpg",
        caption: {
          no: "Takmaling underveis med synlig før-og-etter-effekt",
          en: "Roof painting in progress with a visible before-and-after effect",
        },
      },
      {
        label: "after" as const,
        image: "/gallery/takfornyelse/10-S-after-coated-detail.jpg",
        caption: {
          no: "Jevn og beskyttet takflate etter behandling",
          en: "Even, protected roof surface after treatment",
        },
      },
    ],
  },
  {
    id: "ferdig-behandlede-tak",
    title: {
      no: "Ferdig behandlede tak – ulike boliger",
      en: "Finished roofs – different homes",
    },
    stages: [
      {
        label: "before" as const,
        image: "/gallery/takfornyelse/07-S-before-moss-ridge.jpg",
        caption: {
          no: "Mosegrodd møne og takstein før fornying",
          en: "Moss-covered ridge and roof tiles before renewal",
        },
      },
      {
        label: "after" as const,
        image: "/gallery/takfornyelse/11-S-finished-clean-roof.jpg",
        caption: {
          no: "Rent og ferdig behandlet tak",
          en: "Clean, fully treated roof",
        },
      },
      {
        label: "after" as const,
        image: "/gallery/takfornyelse/06-L-finished-house-roof.jpg",
        caption: {
          no: "Ferdig fornyet tak på enebolig",
          en: "Completed roof renewal on a detached home",
        },
      },
      {
        label: "after" as const,
        image: "/gallery/takfornyelse/12-S-finished-house-roof.jpg",
        caption: {
          no: "Bolig med ferdig behandlet tak og jevn finish",
          en: "Home with a fully treated roof and an even finish",
        },
      },
    ],
  },
] as const;

export const serviceKeys = [
  "inspection",
  "tiles",
  "wash",
  "impregnation",
  "paint",
  "maintenance",
  "warranty",
  "newRoof",
  "softwash",
] as const;

export type ServiceKey = (typeof serviceKeys)[number];
