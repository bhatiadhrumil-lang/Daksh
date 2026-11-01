import type { Category, JournalPost, Product, SortOption } from "@/lib/types";

export const FREE_SHIPPING_THRESHOLD = 6300000;
export const STANDARD_SHIPPING = 200000;
export const EXPRESS_SHIPPING = 400000;

export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Sofas",
    tagline: "Deep seats, honest materials",
    image: "/images/cat-sofas.jpg",
  },
  {
    slug: "chairs",
    name: "Chairs",
    tagline: "Sculptural comfort",
    image: "/images/cat-chairs.jpg",
  },
  {
    slug: "tables",
    name: "Tables",
    tagline: "Solid wood, quiet forms",
    image: "/images/cat-tables.jpg",
  },
  {
    slug: "storage",
    name: "Storage",
    tagline: "Considered organization",
    image: "/images/cat-storage.jpg",
  },
  {
    slug: "lighting",
    name: "Lighting",
    tagline: "Warm, layered light",
    image: "/images/cat-lighting.jpg",
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    tagline: "Made for slower mornings",
    image: "/images/cat-bedroom.jpg",
  },
];

export const products: Product[] = [
  {
    id: "aurelia-sofa",
    slug: "aurelia-3-seater-sofa",
    name: "Aurelia 3-Seater Sofa",
    category: "sofas",
    price: 20850000,
    description:
      "A low, generous silhouette wrapped in plush velvet. The Aurelia is built for long evenings and slow mornings.",
    story:
      "With a solid oak plinth, feather-wrapped cushions, and a deep seat, the Aurelia balances a generous, enveloping form with a precise, architectural frame. Each piece is upholstered by hand in our Copenhagen workshop.",
    image: "/images/aurelia-sofa.jpg",
    colors: [
      { name: "Forest Velvet", hex: "#1f4b3f" },
      { name: "Oat Bouclé", hex: "#d8cdbb" },
      { name: "Ink Linen", hex: "#34322f" },
    ],
    materials: ["Kiln-dried oak frame", "Feather-wrapped cushions", "Cotton-blend velvet"],
    specs: [
      { label: "Dimensions", value: "W 228 × D 96 × H 78 cm" },
      { label: "Seat height", value: "42 cm" },
      { label: "Seat depth", value: "62 cm" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    badge: "Bestseller",
    featured: true,
    rating: 4.9,
    reviewCount: 86,
    stock: 12,
    sku: "OS-SF-001",
  },
  {
    id: "marlow-sofa",
    slug: "marlow-leather-sofa",
    name: "Marlow Leather Sofa",
    category: "sofas",
    price: 33200000,
    description:
      "Full-grain leather that softens with every year. A pared-back frame, deep seats, and hand-finished seams.",
    story:
      "Marlow is an heirloom in the making. The frame is made from kiln-dried oak, the cushions from high-resilience foam wrapped in feather, and the leather from a family-run tannery in Tuscany.",
    image: "/images/marlow-sofa.jpg",
    colors: [
      { name: "Cognac", hex: "#a86d3f" },
      { name: "Black Olive", hex: "#3d3a30" },
      { name: "Stone", hex: "#b8afa0" },
    ],
    materials: ["Full-grain Italian leather", "Kiln-dried oak frame", "Feather-blend wrap"],
    specs: [
      { label: "Dimensions", value: "W 218 × D 94 × H 74 cm" },
      { label: "Seat height", value: "43 cm" },
      { label: "Seat depth", value: "60 cm" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    featured: true,
    rating: 4.8,
    reviewCount: 54,
    stock: 6,
    sku: "OS-SF-002",
  },
  {
    id: "halden-sofa",
    slug: "halden-modular-sofa",
    name: "Halden Modular Sofa",
    category: "sofas",
    price: 27650000,
    description:
      "A modular system designed to adapt. Deep seats, feather-blend cushions, and a tailored grey weave.",
    story:
      "Halden can be reconfigured as your space evolves. Each module connects with concealed brackets, so the sofa stays quiet and seamless while remaining easy to rearrange.",
    image: "/images/halden-sofa.jpg",
    colors: [
      { name: "Fog Grey", hex: "#9c9a94" },
      { name: "Sand", hex: "#c9bda9" },
    ],
    materials: ["Recycled wool blend", "Hardwood frame", "Feather-blend cushions"],
    specs: [
      { label: "Dimensions", value: "W 246 × D 100 × H 72 cm" },
      { label: "Seat height", value: "41 cm" },
      { label: "Modules", value: "3-seat, left or right chaise" },
      { label: "Origin", value: "Made in Lithuania" },
    ],
    rating: 4.7,
    reviewCount: 41,
    stock: 4,
    sku: "OS-SF-003",
  },
  {
    id: "lumen-sofa",
    slug: "lumen-cloud-sofa",
    name: "Lumen Cloud Sofa",
    category: "sofas",
    price: 23950000,
    description:
      "Weightless comfort with a tailored edge. A cloud-soft seat on a slim oak base for a quiet, contemporary presence.",
    story:
      "Lumen pairs a relaxed, low-slung seat with a precise oak base. The removable covers are woven in Italy and can be cleaned or replaced, so the sofa can live through real life.",
    image: "/images/lumen-sofa.jpg",
    colors: [
      { name: "Oatmeal", hex: "#c8bda9" },
      { name: "Chalk", hex: "#e4dfd4" },
    ],
    materials: ["Removable cotton-linen covers", "Solid oak base", "Pocket-spring seat"],
    specs: [
      { label: "Dimensions", value: "W 236 × D 102 × H 70 cm" },
      { label: "Seat height", value: "39 cm" },
      { label: "Cover", value: "Removable, dry clean" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    badge: "New",
    rating: 4.9,
    reviewCount: 63,
    stock: 8,
    sku: "OS-SF-004",
  },
  {
    id: "nora-chair",
    slug: "nora-lounge-chair",
    name: "Nora Lounge Chair",
    category: "chairs",
    price: 9900000,
    description:
      "A sculptural swivel lounge chair with a curved shell and brushed oak base. Compact enough for a reading corner.",
    story:
      "Nora began as a study in curves. The shell is molded over a hardwood frame, then upholstered in a tight, tactile weave. A smooth swivel lets you turn toward the light.",
    image: "/images/nora-chair.jpg",
    colors: [
      { name: "Flax", hex: "#c3b6a3" },
      { name: "Charcoal", hex: "#4a4843" },
      { name: "Moss", hex: "#6b6d54" },
    ],
    materials: ["Molded hardwood shell", "Performance weave", "Brushed oak base"],
    specs: [
      { label: "Dimensions", value: "W 72 × D 74 × H 78 cm" },
      { label: "Seat height", value: "45 cm" },
      { label: "Rotation", value: "360° swivel" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    featured: true,
    rating: 4.9,
    reviewCount: 112,
    stock: 18,
    sku: "OS-CH-001",
  },
  {
    id: "vale-chair",
    slug: "vale-dining-chair",
    name: "Vale Dining Chair",
    category: "chairs",
    price: 3550000,
    description:
      "An olive-green dining chair in soft performance fabric with a solid beech frame and a gently contoured back.",
    story:
      "Vale is designed for long dinners. The contoured back and slightly flexible seat keep you comfortable, while the solid beech frame is built to be repaired, not replaced.",
    image: "/images/vale-chair.jpg",
    colors: [
      { name: "Olive", hex: "#5b5c3f" },
      { name: "Clay", hex: "#b0876b" },
    ],
    materials: ["Performance fabric", "Solid beech frame", "Foam-padded seat"],
    specs: [
      { label: "Dimensions", value: "W 50 × D 54 × H 80 cm" },
      { label: "Seat height", value: "46 cm" },
      { label: "Stackable", value: "No" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    rating: 4.6,
    reviewCount: 78,
    stock: 32,
    sku: "OS-CH-002",
  },
  {
    id: "sable-chair",
    slug: "sable-accent-chair",
    name: "Sable Accent Chair",
    category: "chairs",
    price: 5800000,
    description:
      "A bold accent chair with a molded shell and tapered legs. A graphic silhouette that anchors a quiet room.",
    story:
      "Sable is a small chair with a strong point of view. The molded shell is wrapped in a soft, matte weave, and the tapered oak legs are finished by hand.",
    image: "/images/sable-chair.jpg",
    colors: [
      { name: "Ink", hex: "#25232a" },
      { name: "Bone", hex: "#d7d0c3" },
    ],
    materials: ["Molded shell", "Matte weave", "Solid oak legs"],
    specs: [
      { label: "Dimensions", value: "W 54 × D 56 × H 79 cm" },
      { label: "Seat height", value: "45 cm" },
      { label: "Weight", value: "6.8 kg" },
      { label: "Origin", value: "Made in Italy" },
    ],
    rating: 4.5,
    reviewCount: 33,
    stock: 14,
    sku: "OS-CH-003",
  },
  {
    id: "ivo-chair",
    slug: "ivo-slipper-chair",
    name: "Ivo Slipper Chair",
    category: "chairs",
    price: 4550000,
    description:
      "A tufted slipper chair with a petite footprint, dressed in ivory bouclé. Made for bedrooms and quiet corners.",
    story:
      "Ivo is an exercise in restraint. A petite slipper chair with a deep buttoned back, upholstered in a soft ivory bouclé and finished with a solid beech frame.",
    image: "/images/ivo-chair.jpg",
    colors: [
      { name: "Ivory", hex: "#e7e0d2" },
      { name: "Mist", hex: "#c9c7bc" },
    ],
    materials: ["Bouclé upholstery", "Solid beech frame", "Hand-tufted back"],
    specs: [
      { label: "Dimensions", value: "W 54 × D 62 × H 76 cm" },
      { label: "Seat height", value: "44 cm" },
      { label: "Weight", value: "7.2 kg" },
      { label: "Origin", value: "Made in Poland" },
    ],
    rating: 4.7,
    reviewCount: 59,
    stock: 10,
    sku: "OS-CH-004",
  },
  {
    id: "pera-stool",
    slug: "pera-counter-stool",
    name: "Pera Counter Stool",
    category: "chairs",
    price: 2600000,
    compareAtPrice: 2950000,
    description:
      "A counter stool with a solid oak frame and a sculpted seat. Built for kitchen islands and long conversations.",
    story:
      "Pera is made from a single length of solid oak, steam-bent into a quiet curve. The footrest is positioned for comfort and the seat is shaped by hand.",
    image: "/images/pera-stool.jpg",
    colors: [
      { name: "Natural Oak", hex: "#cdbca4" },
      { name: "Black Oak", hex: "#3b3731" },
    ],
    materials: ["Solid oak", "Steam-bent frame", "Hand-shaped seat"],
    specs: [
      { label: "Dimensions", value: "W 42 × D 44 × H 66 cm" },
      { label: "Seat height", value: "66 cm" },
      { label: "Weight", value: "4.1 kg" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    rating: 4.6,
    reviewCount: 47,
    stock: 22,
    sku: "OS-CH-005",
  },
  {
    id: "ostra-tables",
    slug: "ostra-nesting-tables",
    name: "Ostra Nesting Tables",
    category: "tables",
    price: 7500000,
    description:
      "Three solid walnut tables that nest into one. Use them together for a layered coffee table or pull them apart for extra guests.",
    story:
      "Ostra is a set of three nesting tables in solid walnut. Each top is finished with a hardwax oil that protects the grain while letting the wood age gracefully.",
    image: "/images/ostra-tables.jpg",
    colors: [
      { name: "Walnut", hex: "#6b4b34" },
      { name: "Oak", hex: "#c7b395" },
    ],
    materials: ["Solid walnut", "Hardwax oil finish", "Felt-lined feet"],
    specs: [
      { label: "Large", value: "W 58 × D 40 × H 45 cm" },
      { label: "Medium", value: "W 48 × D 36 × H 41 cm" },
      { label: "Small", value: "W 38 × D 32 × H 37 cm" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    badge: "New",
    featured: true,
    rating: 4.8,
    reviewCount: 26,
    stock: 9,
    sku: "OS-TB-001",
  },
  {
    id: "tana-table",
    slug: "tana-side-table",
    name: "Tana Side Table",
    category: "tables",
    price: 2850000,
    description:
      "A rounded side table in white oak with a hand-finished top. Just the right size for a lamp, a book, and a cup of tea.",
    story:
      "Tana is made from solid white oak, with a softly rounded top and three tapered legs. The hand-finished surface celebrates the natural grain and variation of the wood.",
    image: "/images/tana-table.jpg",
    colors: [{ name: "White Oak", hex: "#d1c1a7" }],
    materials: ["Solid white oak", "Hardwax oil finish", "Hand-finished top"],
    specs: [
      { label: "Dimensions", value: "Ø 45 × H 55 cm" },
      { label: "Top thickness", value: "3 cm" },
      { label: "Weight", value: "5.6 kg" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    rating: 4.7,
    reviewCount: 38,
    stock: 16,
    sku: "OS-TB-002",
  },
  {
    id: "kess-cabinet",
    slug: "kess-oak-cabinet",
    name: "Kess Oak Cabinet",
    category: "storage",
    price: 10400000,
    description:
      "A tall, slim cabinet in pale oak with adjustable shelving and a push-latch door. Storage that feels like furniture.",
    story:
      "Kess is designed to disappear into a room while quietly doing its job. Adjustable shelves hold books, records, and linen; the push-latch door keeps the surface calm.",
    image: "/images/kess-cabinet.jpg",
    colors: [
      { name: "Pale Oak", hex: "#c7b69b" },
      { name: "Smoked Oak", hex: "#7a6652" },
    ],
    materials: ["Oak veneer", "Solid oak edges", "Adjustable shelves"],
    specs: [
      { label: "Dimensions", value: "W 62 × D 34 × H 168 cm" },
      { label: "Shelves", value: "4 adjustable" },
      { label: "Installation", value: "Wall anchor included" },
      { label: "Origin", value: "Made in Lithuania" },
    ],
    rating: 4.8,
    reviewCount: 19,
    stock: 7,
    sku: "OS-ST-001",
  },
  {
    id: "lina-shelf",
    slug: "lina-wall-shelf",
    name: "Lina Wall Shelf",
    category: "storage",
    price: 3850000,
    description:
      "A floating wall shelf in solid oak, with a slim profile and concealed brackets. Style it with books and ceramics.",
    story:
      "Lina is a floating shelf made from solid oak with concealed steel brackets. The slim profile keeps the focus on what you place on it, not the shelf itself.",
    image: "/images/lina-shelf.jpg",
    colors: [{ name: "Natural Oak", hex: "#c9b79c" }],
    materials: ["Solid oak", "Concealed steel bracket", "Hardwax oil finish"],
    specs: [
      { label: "Dimensions", value: "W 120 × D 24 × H 4 cm" },
      { label: "Load", value: "Up to 15 kg" },
      { label: "Installation", value: "Concealed bracket included" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    rating: 4.6,
    reviewCount: 24,
    stock: 20,
    sku: "OS-ST-002",
  },
  {
    id: "sora-lamp",
    slug: "sora-table-lamp",
    name: "Sora Table Lamp",
    category: "lighting",
    price: 2200000,
    description:
      "A table lamp with a warm, diffused glow and a hand-thrown ceramic base. Small enough for a desk, strong enough for a room.",
    story:
      "Sora is made by hand in a small ceramics studio outside Lisbon. The linen shade diffuses a warm, even light, and the dimmer is built into the cord.",
    image: "/images/sora-lamp.jpg",
    colors: [
      { name: "Chalk", hex: "#e5dfd2" },
      { name: "Terra", hex: "#b9795f" },
    ],
    materials: ["Hand-thrown ceramic", "Linen shade", "Braided cord"],
    specs: [
      { label: "Dimensions", value: "Ø 30 × H 48 cm" },
      { label: "Bulb", value: "E27, max 40W (not included)" },
      { label: "Dimmer", value: "In-line dimmer" },
      { label: "Origin", value: "Made in Portugal" },
    ],
    rating: 4.7,
    reviewCount: 66,
    stock: 25,
    sku: "OS-LT-001",
  },
  {
    id: "halo-pendant",
    slug: "halo-pendant-light",
    name: "Halo Pendant Light",
    category: "lighting",
    price: 4850000,
    description:
      "A cluster of three hand-blown glass pendants on aged brass hardware. Soft, layered light for dining tables.",
    story:
      "Halo is a trio of hand-blown glass shades, each with its own subtle variation. The aged brass canopy and braided cords can be adjusted to suit your ceiling height.",
    image: "/images/halo-pendant.jpg",
    colors: [
      { name: "Amber", hex: "#b58a4a" },
      { name: "Smoke", hex: "#6e6960" },
    ],
    materials: ["Hand-blown glass", "Aged brass hardware", "Braided fabric cord"],
    specs: [
      { label: "Canopy", value: "Ø 30 cm" },
      { label: "Shades", value: "3 × Ø 22 cm" },
      { label: "Drop", value: "Adjustable up to 180 cm" },
      { label: "Origin", value: "Made in Poland" },
    ],
    rating: 4.8,
    reviewCount: 31,
    stock: 11,
    sku: "OS-LT-002",
  },
  {
    id: "serene-bed",
    slug: "serene-bed-frame",
    name: "Serene Bed Frame",
    category: "bedroom",
    price: 14200000,
    description:
      "An upholstered bed frame with a channel-tufted headboard and a solid oak base. Designed for deep sleep and slow Sundays.",
    story:
      "Serene pairs a softly upholstered, channel-tufted headboard with a solid oak base. The low profile keeps the room calm, and the slatted base needs no box spring.",
    image: "/images/serene-bed.jpg",
    colors: [
      { name: "Oat", hex: "#cfc0a8" },
      { name: "Ash", hex: "#9a958b" },
    ],
    materials: ["Upholstered headboard", "Solid oak base", "Beech slats"],
    specs: [
      { label: "Sizes", value: "Queen, King" },
      { label: "Dimensions", value: "W 168 × L 220 × H 96 cm" },
      { label: "Clearance", value: "18 cm" },
      { label: "Origin", value: "Made in Denmark" },
    ],
    rating: 4.9,
    reviewCount: 52,
    stock: 5,
    sku: "OS-BD-001",
  },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "art-of-slow-living",
    title: "The art of slow living",
    excerpt:
      "A case for fewer, better things — and for giving the rooms you live in permission to be quiet.",
    category: "Living",
    date: "October 12, 2026",
    readTime: "6 min read",
    image: "/images/journal-slow-living.jpg",
    body: [
      "Slow living is less a style than a rhythm. It is the decision to let a room breathe, to leave a wall empty, and to choose one chair that will still feel right in ten years over three that will not.",
      "Start with the pieces you touch every day: the sofa you sink into at the end of the day, the chair you pull up to the table, the lamp you switch on first. These are the objects that set the tempo of a home.",
      "Materials matter here. Solid oak will darken and soften. Linen will crease. Leather will develop a patina. None of this is damage; it is the record of a life being lived.",
      "The most considered rooms are rarely the fullest ones. They leave space for the unexpected — a branch brought in from a walk, a stack of books, a chair pulled toward a window.",
    ],
  },
  {
    slug: "mixing-materials",
    title: "A guide to mixing materials",
    excerpt:
      "Oak, linen, stone, and glass: how to layer natural materials without losing the calm.",
    category: "Guides",
    date: "September 28, 2026",
    readTime: "5 min read",
    image: "/images/journal-materials.jpg",
    body: [
      "A room becomes interesting when materials disagree a little. A rough linen against a smooth stone top, a warm oak against a cool plaster wall — these contrasts are what give a space depth.",
      "Begin with a dominant material and let it set the tone. If oak is your anchor, introduce one soft textile and one hard surface. Resist the urge to match every wood tone exactly; small variations feel more natural.",
      "Texture does the same work as color with less noise. A bouclé chair in a neutral room reads as a tonal pattern, adding warmth without adding visual weight.",
      "Finish with something reflective. Glass, brass, or a glazed ceramic will catch the light and keep a layered room from feeling heavy.",
    ],
  },
  {
    slug: "copenhagen-apartment",
    title: "Inside a Copenhagen apartment",
    excerpt:
      "A small city home where generous storage, low furniture, and morning light do most of the work.",
    category: "Spaces",
    date: "September 9, 2026",
    readTime: "7 min read",
    image: "/images/journal-apartment.jpg",
    body: [
      "The apartment is small — around sixty square meters — but it lives large. The furniture is low, the storage reaches the ceiling, and the palette is limited to chalk, pale oak, and a single note of rust.",
      "The living room is arranged around light rather than a television. A low sofa faces a tall window; a pair of chairs can be pulled toward the table or turned toward the view.",
      "In the bedroom, a slim upholstered bed and one wall of built-in storage keep the floor clear. The curtains are linen, unlined, and hung close to the ceiling to make the room feel taller.",
      "What stands out is not any single object but the restraint. Every piece has a job, and nothing is shouting for attention.",
    ],
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryCount(slug: string) {
  return products.filter((product) => product.category === slug).length;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 4);
}

export function getNewArrivals() {
  return products.filter((product) => product.badge === "New");
}

export function getRelatedProducts(product: Product, limit = 3) {
  const sameCategory = products.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const fallback = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      !sameCategory.some((related) => related.id === candidate.id),
  );

  return [...sameCategory, ...fallback].slice(0, limit);
}

export function searchProducts({
  query = "",
  category = "",
  sort = "featured",
}: {
  query?: string;
  category?: string;
  sort?: SortOption;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  let result = products.filter((product) => {
    const matchesCategory = category ? product.category === category : true;
    const haystack = [
      product.name,
      product.description,
      product.category,
      ...product.materials,
      ...product.colors.map((color) => color.name),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = normalizedQuery ? haystack.includes(normalizedQuery) : true;

    return matchesCategory && matchesQuery;
  });

  result = [...result];

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "newest":
      result.sort((a, b) => {
        const aNew = a.badge === "New" ? 1 : 0;
        const bNew = b.badge === "New" ? 1 : 0;
        return bNew - aNew || b.rating - a.rating;
      });
      break;
    default:
      result.sort((a, b) => {
        const aFeatured = a.featured ? 1 : 0;
        const bFeatured = b.featured ? 1 : 0;
        return bFeatured - aFeatured || b.rating - a.rating;
      });
  }

  return result;
}
