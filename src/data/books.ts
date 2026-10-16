export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  coverImage: string;
  category: 'Essays' | 'Architecture' | 'Botany' | 'Culture' | 'Philosophy';
  format: 'HARDCOVER' | 'CLOTHBOUND' | 'FIRST EDITION' | 'COLLECTOR’S EDITION';
  rating: number;
  reviewsCount: number;
  isbn: string;
  pages: number;
  year: number;
  publisher: string;
  synopsis: string;
  quote: string;
  tableOfContents: string[];
  sampleExcerpt: string;
  inStock: boolean;
  featured?: boolean;
  salonPick?: boolean;
}

export const BOOKS: Book[] = [
  {
    id: 'stillness-eliza-reed',
    title: 'The Art of Stillness',
    author: 'Eliza Reed',
    price: 34.00,
    originalPrice: 42.00,
    coverImage: '/src/assets/images/book_the_art_of_stillness_1792115614097.jpg',
    category: 'Philosophy',
    format: 'CLOTHBOUND',
    rating: 4.9,
    reviewsCount: 142,
    isbn: '978-0-984210-41-2',
    pages: 312,
    year: 2025,
    publisher: 'Kinsfolk & Press, Edinburgh',
    synopsis: 'An intimate meditation on unhurried observation, tactile craftsmanship, and deliberate silence in an accelerated world. Bound in deep forest cedar bookcloth with debossed botanical flourishes and hand-gilded edges.',
    quote: 'True silence is not the absence of sound, but the presence of an attentive spirit capable of listening to quiet truths.',
    tableOfContents: [
      'I. The Geometry of the Quiet Morning',
      'II. The Tactility of Wood, Stone, and Page',
      'III. Breathing with Shadows',
      'IV. An Anatomy of Voluntary Slowness',
      'V. The Solitary Garden'
    ],
    sampleExcerpt: 'Dawn arrived without theatrical display, slipping through the linen curtains in gradations of pearl and wet slate. On the cedar table sat a single earthenware vessel and an unread ledger. Here, the mind relinquishes its nervous appetite for consequence. To sit without urgency is perhaps the most radical aesthetic posture remaining to us.',
    inStock: true,
    featured: true,
    salonPick: true
  },
  {
    id: 'echoes-mediterranean',
    title: 'Echoes of the Mediterranean',
    author: 'Sarah J. Alvarez & Leo D. Costas',
    price: 38.50,
    coverImage: '/src/assets/images/book_echoes_mediterranean_1792115614845.jpg',
    category: 'Culture',
    format: 'FIRST EDITION',
    rating: 4.8,
    reviewsCount: 96,
    isbn: '978-1-841920-19-4',
    pages: 288,
    year: 2024,
    publisher: 'Est. Fine Press, Athens & Seville',
    synopsis: 'Stories and essays on culture, clay, olive groves, and coastal architecture. Bound in terracotta textured linen with ceramic bas-relief embossing.',
    quote: 'The sea teaches patience; the kiln teaches surrender to fire.',
    tableOfContents: [
      'I. Terracotta & Salt Air',
      'II. The Cycladic White Line',
      'III. Olive Presses of Andalusia',
      'IV. Wind Patterns of the Aegean',
      'V. Feast of the Harvest Solstice'
    ],
    sampleExcerpt: 'In the pottery villages of the Peloponnese, clay is spoken of as a living temperament. The artisan Leo kneads with his forearms in cyclical rhythm, waiting for the humidity of the afternoon sirocco. When the glaze vitrifies in the olive-wood kiln, it remembers every breath of wind that stirred the orchard.',
    inStock: true,
    featured: true
  },
  {
    id: 'naturalist-kyoto',
    title: 'A Naturalist in Kyoto',
    author: 'Eliza J. Finch',
    price: 36.00,
    coverImage: '/src/assets/images/book_naturalist_kyoto_1792115616106.jpg',
    category: 'Essays',
    format: 'HARDCOVER',
    rating: 5.0,
    reviewsCount: 184,
    isbn: '978-0-721609-88-0',
    pages: 340,
    year: 2025,
    publisher: 'Kado Arts, Kyoto & London',
    synopsis: 'Observations on moss gardens, wildlife, and the 72 micro-seasons of Japan. Illustrated with woodblock prints and printed on textured vellum paper.',
    quote: 'To understand Kyoto’s moss is to understand eternity measured in dew drops.',
    tableOfContents: [
      'I. First Plum Blossoms under Ice',
      'II. The Warbler in the Bamboo Fence',
      'III. Temple Stone and Raked Gravel',
      'IV. The Cicadas of Daitoku-ji',
      'V. Deep Frost and Persimmon Branches'
    ],
    sampleExcerpt: 'At Saihō-ji, one hundred and twenty varieties of bryophyte carpet the grounds in varying emeralds. Some catch light like velvet; others drink moisture until they resemble underwater coral. Finch records the visit of the pygmy woodpecker, tapping upon ancient cypress bark with measured precision.',
    inStock: true,
    featured: true,
    salonPick: true
  },
  {
    id: 'architecture-mind',
    title: 'Architecture of the Mind',
    author: 'Julian M. Vane',
    price: 45.00,
    originalPrice: 50.00,
    coverImage: '/src/assets/images/book_architecture_mind_1792115616212.jpg',
    category: 'Architecture',
    format: 'COLLECTOR’S EDITION',
    rating: 4.9,
    reviewsCount: 78,
    isbn: '978-3-948110-02-1',
    pages: 420,
    year: 2024,
    publisher: 'Bauhaus Monograph Society',
    synopsis: 'A journey through internal structures, sacred geometries, and spatial memory. Featuring architectural drafting overlays, gold foil grid lines, and midnight navy cloth.',
    quote: 'We shape our buildings, and thereafter our thoughts inhabit their corridors.',
    tableOfContents: [
      'I. Thresholds and Vestibules',
      'II. The Vault of Unexpressed Thoughts',
      'III. Escherian Staircases in Daily Routine',
      'IV. The Clad Wall: Privacy vs Communion',
      'V. Light Wells in Human Memory'
    ],
    sampleExcerpt: 'Every cathedral is an exteriorization of human contemplation, just as every narrow stairwell reflects our hesitations. When we walk down an arched arcade, the rhythmic cadence of the columns sets the pace of our breath. Space is not passive; it commands cognitive resonance.',
    inStock: true,
    featured: true
  },
  {
    id: 'flora-silence',
    title: 'Flora & Silence',
    author: 'Elara Nightingale',
    price: 32.50,
    coverImage: '/src/assets/images/book_flora_and_silence_1792115616078.jpg',
    category: 'Botany',
    format: 'HARDCOVER',
    rating: 4.8,
    reviewsCount: 115,
    isbn: '978-0-451299-17-6',
    pages: 264,
    year: 2025,
    publisher: 'Herbarium Press, Oxford',
    synopsis: 'An herbalist’s chronicle of ferns, medicinal mosses, and the restorative calm found in secluded northern woodlands. Gilded debossing on deckled antique paper.',
    quote: 'Plants know neither haste nor delay; they simply reach toward the sun.',
    tableOfContents: [
      'I. Gathering in the Morning Fog',
      'II. Roots of the Mountain Angelica',
      'III. The Frond’s Unfurling',
      'IV. Infusions for Weary Minds',
      'V. Winter Sleep of the Seed'
    ],
    sampleExcerpt: 'In the damp shade beneath the ancient beech trees, the maidenhair fern spreads its delicate lacework. To gather herbs at dawn is an act of communion. One does not pluck with haste; one asks permission from the morning moisture, taking only what is offered freely by the earth.',
    inStock: true,
    featured: true
  }
];

export const GENRES = [
  'All Collections',
  'Philosophy',
  'Culture',
  'Essays',
  'Architecture',
  'Botany'
] as const;

export const SALON_DISCUSSIONS = [
  {
    id: 'disc-1',
    bookTitle: 'The Art of Stillness',
    topic: 'Chapter III: The sensory dialogue between tactile print and digital cognition',
    curator: 'Margot Laurent, Salon Dean',
    commentsCount: 38,
    date: 'October Salon Session'
  },
  {
    id: 'disc-2',
    bookTitle: 'A Naturalist in Kyoto',
    topic: 'The 72 Japanese micro-seasons as a framework for contemplative living',
    curator: 'Dr. Kenji Sato, Guest Bibliophile',
    commentsCount: 52,
    date: 'Active Reading Circle'
  }
];
