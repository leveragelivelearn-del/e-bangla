const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGODB_URI=(.*)$/m);
  if (match && match[1]) {
    mongodbUri = match[1].trim().replace(/['"]/g, '');
  }
}

if (!mongodbUri) {
  mongodbUri = 'mongodb+srv://EuropeBangla:xI2QuBaFZsYQ5vRD@cluster0.e5n1hnl.mongodb.net/EuropeBangla';
}

console.log('Connecting to MongoDB...');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
});
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  purchasePrice: { type: Number },
  discountRate: { type: Number },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  tags: [{ type: String }],
  images: [{ type: String }],
  attributes: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isFlashSale: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true },
  ratings: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const productsData = [
  // ==================== Category 1: Fashion ====================
  {
    name: "Men's Vintage Blue Denim Jacket",
    slug: 'classic-denim-jacket',
    description: 'A classic regular-fit denim jacket crafted from heavyweight durable cotton. Features classic button-flap chest pockets, welt hand pockets, and waist adjusters. Designed to age beautifully with natural wear.',
    price: 2450,
    salePrice: 1850,
    discountRate: 24,
    purchasePrice: 950,
    stock: 65,
    sku: 'EB-FASH-01',
    categorySlug: 'fashion',
    images: ['/assets/images/products/classic-denim-jacket.webp'],
    tags: ['denim jacket', 'fashion', 'outerwear', 'men fashion'],
    attributes: [{ key: 'Color', value: 'Vintage Blue' }, { key: 'Material', value: '100% Cotton Denim' }, { key: 'Fit', value: 'Regular Fit' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: "Women's Floral Printed Summer Dress",
    slug: 'elegant-summer-dress',
    description: 'An elegant A-line summer dress made from premium breathable georgette fabric. Designed with a stylish V-neckline, flared sleeves, and a gorgeous vibrant floral pattern ideal for casual daytime outings.',
    price: 1850,
    purchasePrice: 650,
    stock: 80,
    sku: 'EB-FASH-02',
    categorySlug: 'fashion',
    images: ['/assets/images/products/elegant-summer-dress.webp'],
    tags: ['summer dress', 'floral', 'women fashion', 'casual'],
    attributes: [{ key: 'Pattern', value: 'Floral' }, { key: 'Material', value: 'Premium Georgette' }, { key: 'Fit', value: 'A-Line' }],
    isFeatured: true,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: "Men's Premium Leather Oxford Shoes",
    slug: 'classic-leather-shoes',
    description: 'Meticulously crafted from full-grain cowhide leather, these formal Oxford dress shoes feature detailed hand-stitching, a sleek leather lining, and a durable cushioned outsole for boardroom comfort.',
    price: 3800,
    salePrice: 2950,
    discountRate: 22,
    purchasePrice: 1400,
    stock: 35,
    sku: 'EB-FASH-03',
    categorySlug: 'fashion',
    images: ['/assets/images/products/classic-leather-shoes.webp'],
    tags: ['leather shoes', 'formal', 'men fashion', 'oxford'],
    attributes: [{ key: 'Color', value: 'Dark Brown' }, { key: 'Material', value: 'Genuine Cow Leather' }, { key: 'Sole', value: 'Comfort Cushioned' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Classic Minimalist Leather Watch',
    slug: 'minimalist-analog-watch',
    description: 'A modern minimalist analog watch equipped with a precise Japanese quartz movement. Features a premium black genuine leather strap, scratch-resistant mineral glass, and a polished stainless steel case.',
    price: 1650,
    purchasePrice: 550,
    stock: 75,
    sku: 'EB-FASH-04',
    categorySlug: 'fashion',
    images: ['/assets/images/products/minimalist-analog-watch.webp'],
    tags: ['watch', 'minimalist', 'accessories', 'unisex'],
    attributes: [{ key: 'Strap Material', value: 'Genuine Leather' }, { key: 'Movement', value: 'Japanese Quartz' }, { key: 'Water Resistance', value: '3 ATM' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: "Women's Luxury Leather Handbag",
    slug: 'designer-leather-handbag',
    description: 'Elevate your aesthetic with this structured luxury shoulder bag crafted from pebbled top-grain leather. Designed with gold-tone hardware, multiple internal pockets, and a detachable crossbody strap.',
    price: 4800,
    purchasePrice: 1950,
    stock: 30,
    sku: 'EB-FASH-05',
    categorySlug: 'fashion',
    images: ['/assets/images/products/designer-leather-handbag.webp'],
    tags: ['handbag', 'leather', 'women accessories', 'luxury'],
    attributes: [{ key: 'Color', value: 'Nude Beige' }, { key: 'Material', value: 'Top-Grain Leather' }, { key: 'Hardware', value: 'Gold-Plated' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },

  // ==================== Category 2: Agro ====================
  {
    name: 'Fresh Organic Vegetable Combo Box',
    slug: 'organic-vegetable-basket',
    description: 'A handpicked mix of chemical-free, freshly harvested farm vegetables. Includes ripe tomatoes, fresh carrots, crisp bell peppers, and fresh leafy greens, sourced daily from local organic farms.',
    price: 520,
    salePrice: 420,
    discountRate: 19,
    purchasePrice: 220,
    stock: 120,
    sku: 'EB-AGRO-01',
    categorySlug: 'agro',
    images: ['/assets/images/products/organic-vegetable-basket.webp'],
    tags: ['vegetables', 'organic', 'fresh agro', 'healthy'],
    attributes: [{ key: 'Type', value: 'Mixed Produce' }, { key: 'Source', value: 'Local Farms' }, { key: 'Pesticide Free', value: 'Yes' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Premium Aromatic Basmati Rice',
    slug: 'premium-basmati-rice-bag',
    description: 'Extra-long grain authentic Basmati rice known for its delicate fragrance and fluffy texture. Aged to perfection to ensure separate grains after cooking, ideal for biryanis and pulaos.',
    price: 195,
    purchasePrice: 120,
    stock: 600,
    sku: 'EB-AGRO-02',
    categorySlug: 'agro',
    images: ['/assets/images/products/premium-basmati-rice-bag.webp'],
    tags: ['basmati rice', 'agro products', 'staple food', 'aromatic'],
    attributes: [{ key: 'Weight', value: '5kg' }, { key: 'Grain Length', value: '8.2mm' }, { key: 'Aged', value: '1+ Years' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Fresh Red Gala Apples (1kg)',
    slug: 'fresh-red-apples',
    description: 'Crisp, highly nutritious, and sweet Red Gala apples. Sourced from high-altitude orchards, hand-inspected for blemishes, and stored under strict temperature control to maintain freshness.',
    price: 290,
    salePrice: 230,
    discountRate: 20,
    purchasePrice: 140,
    stock: 250,
    sku: 'EB-AGRO-03',
    categorySlug: 'agro',
    images: ['/assets/images/products/fresh-red-apples.webp'],
    tags: ['apples', 'fresh fruits', 'organic', 'healthy snacks'],
    attributes: [{ key: 'Quantity', value: '1kg' }, { key: 'Origin', value: 'Imported' }, { key: 'Taste', value: 'Sweet & Crisp' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Pure Golden Raw Honey (500g)',
    slug: 'golden-raw-honey-jar',
    description: 'Unprocessed, unpasteurized 100% natural raw honey harvested from wild forest beehives. Packed with enzymes, antioxidants, and a rich floral flavor profile without any added sugar.',
    price: 680,
    purchasePrice: 320,
    stock: 180,
    sku: 'EB-AGRO-04',
    categorySlug: 'agro',
    images: ['/assets/images/products/golden-raw-honey-jar.webp'],
    tags: ['raw honey', 'organic honey', 'natural sweetener', 'health'],
    attributes: [{ key: 'Net Weight', value: '500g' }, { key: 'Purity', value: '100% Wild Raw' }, { key: 'Packaging', value: 'Glass Jar' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Cold Pressed Pure Mustard Oil (1L)',
    slug: 'cold-pressed-mustard-oil',
    description: 'Extracted from premium selected mustard seeds using traditional wooden ghani methods at low temperature. Retains natural pungent compounds, sharp flavor, and essential fatty acids.',
    price: 330,
    purchasePrice: 200,
    stock: 300,
    sku: 'EB-AGRO-05',
    categorySlug: 'agro',
    images: ['/assets/images/products/cold-pressed-mustard-oil.webp'],
    tags: ['mustard oil', 'cold pressed', 'cooking oil', 'organic oil'],
    attributes: [{ key: 'Volume', value: '1 Litre' }, { key: 'Extraction', value: 'Wooden Ghani' }, { key: 'Cholesterol Free', value: 'Yes' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },

  // ==================== Category 3: Crafts ====================
  {
    name: 'Handcarved Decorative Wooden Vase',
    slug: 'handmade-wooden-vase',
    description: 'A beautiful tabletop flower vase handcarved from a single block of mature Mahogany wood. Polished to highlight its organic wavy wood grains. Adds a warm natural touch to home decor.',
    price: 1250,
    salePrice: 990,
    discountRate: 20,
    purchasePrice: 420,
    stock: 45,
    sku: 'EB-CRFT-01',
    categorySlug: 'crafts',
    images: ['/assets/images/products/handmade-wooden-vase.webp'],
    tags: ['wooden vase', 'handmade', 'home decor', 'rustic'],
    attributes: [{ key: 'Material', value: 'Mahogany Wood' }, { key: 'Height', value: '12 inches' }, { key: 'Finish', value: 'Polished Lacquer' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Handwoven Round Jute Storage Basket',
    slug: 'hand-woven-jute-basket',
    description: 'An eco-friendly, highly durable storage basket handcrafted by local artisans from 100% natural braided jute fibers. Perfect for organizing household items, toys, or magazines.',
    price: 890,
    purchasePrice: 320,
    stock: 90,
    sku: 'EB-CRFT-02',
    categorySlug: 'crafts',
    images: ['/assets/images/products/hand-woven-jute-basket.webp'],
    tags: ['jute basket', 'hand woven', 'storage', 'eco friendly'],
    attributes: [{ key: 'Material', value: '100% Organic Jute' }, { key: 'Diameter', value: '14 inches' }, { key: 'Handles', value: 'Dual Side Knitted' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Handpainted Terracotta Clay Vase',
    slug: 'decorative-clay-pottery',
    description: 'A traditionally sculpted terracotta clay flower pot, detailed with intricate handpainted geometric and folklore patterns. Suitable for holding dry flowers or as a standalone decor piece.',
    price: 980,
    salePrice: 780,
    discountRate: 20,
    purchasePrice: 350,
    stock: 40,
    sku: 'EB-CRFT-03',
    categorySlug: 'crafts',
    images: ['/assets/images/products/decorative-clay-pottery.webp'],
    tags: ['clay pottery', 'handmade', 'artisan vase', 'painted decor'],
    attributes: [{ key: 'Material', value: 'Terracotta Clay' }, { key: 'Paint Type', value: 'Waterproof Acrylic' }, { key: 'Origin', value: 'Local Artisans' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Handcrafted Leather Bifold Wallet',
    slug: 'handcrafted-leather-wallet',
    description: 'Made from vegetable-tanned genuine crazy horse leather. Stitched manually with thick waxed thread. Includes 6 card slots, a main cash compartment, and develops a beautiful vintage patina over time.',
    price: 1550,
    purchasePrice: 600,
    stock: 60,
    sku: 'EB-CRFT-04',
    categorySlug: 'crafts',
    images: ['/assets/images/products/handcrafted-leather-wallet.webp'],
    tags: ['leather wallet', 'handcrafted', 'accessories', 'men fashion'],
    attributes: [{ key: 'Leather Type', value: 'Vegetable-Tanned Cow Leather' }, { key: 'Stitching', value: 'Waxed Thread Hand Stitch' }, { key: 'Card Slots', value: '6' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Antique Brass Engraved Candle Holder',
    slug: 'antique-brass-candle-holder',
    description: 'An elegant vintage-inspired candle holder cast in solid brass. Features intricate hand-engraved motifs on the stem and base, designed to hold standard taper candles.',
    price: 1350,
    purchasePrice: 500,
    stock: 40,
    sku: 'EB-CRFT-05',
    categorySlug: 'crafts',
    images: ['/assets/images/products/antique-brass-candle-holder.webp'],
    tags: ['candle holder', 'antique brass', 'decor', 'classic styling'],
    attributes: [{ key: 'Material', value: 'Solid Brass' }, { key: 'Weight', value: '450g' }, { key: 'Finish', value: 'Burnished Antique' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },

  // ==================== Category 4: Apparel & Textile ====================
  {
    name: 'Industrial Combed Cotton Yarn Spools',
    slug: 'raw-cotton-yarn-spools',
    description: 'High-tensile, premium quality combed cotton yarn spools. Free of impurities, making it perfect for industrial knitting, power-loom weaving, and export clothing production.',
    price: 480,
    salePrice: 380,
    discountRate: 20,
    purchasePrice: 190,
    stock: 1200,
    sku: 'EB-APRL-01',
    categorySlug: 'apparel-textile',
    images: ['/assets/images/products/raw-cotton-yarn-spools.webp'],
    tags: ['cotton yarn', 'textile spools', 'industrial yarn', 'weaving'],
    attributes: [{ key: 'Material', value: '100% Combed Cotton' }, { key: 'Count', value: '40s Ne' }, { key: 'Weight per Spool', value: '1.2kg' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: '12oz Premium Denim Fabric Roll',
    slug: 'premium-denim-fabric-roll',
    description: 'A heavyweight, dark indigo blue denim fabric roll. High cotton content with a hint of elastane for flexibility. Ideal for custom tailoring of jeans, jackets, and overalls.',
    price: 880,
    purchasePrice: 380,
    stock: 450,
    sku: 'EB-APRL-02',
    categorySlug: 'apparel-textile',
    images: ['/assets/images/products/premium-denim-fabric-roll.webp'],
    tags: ['denim fabric', 'fabric rolls', 'apparel material', 'indigo twill'],
    attributes: [{ key: 'Weight', value: '12 oz' }, { key: 'Composition', value: '98% Cotton / 2% Elastane' }, { key: 'Width', value: '58 inches' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Pure Organic Linen Tailoring Fabric',
    slug: 'organic-linen-fabric-roll',
    description: 'Premium quality biodegradable linen fabric roll with a natural beige slub texture. Highly absorbent, breathable, and pre-washed to prevent shrinking during garment tailoring.',
    price: 980,
    salePrice: 780,
    discountRate: 20,
    purchasePrice: 420,
    stock: 350,
    sku: 'EB-APRL-03',
    categorySlug: 'apparel-textile',
    images: ['/assets/images/products/organic-linen-fabric-roll.webp'],
    tags: ['linen fabric', 'organic fabric', 'breathable linen', 'tailoring'],
    attributes: [{ key: 'Material', value: '100% Organic Linen' }, { key: 'Color', value: 'Natural Beige' }, { key: 'GSM', value: '180' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Multi-Color Cotton Fabric Bundle',
    slug: 'colorful-cotton-fabric-stack',
    description: 'A curated stack of 100% premium cotton fabric sheets in various soft pastel shades. Ideal for sewing projects, quilting, apparel lining, and custom fashion sample sewing.',
    price: 620,
    purchasePrice: 260,
    stock: 500,
    sku: 'EB-APRL-04',
    categorySlug: 'apparel-textile',
    images: ['/assets/images/products/colorful-cotton-fabric-stack.webp'],
    tags: ['cotton sheets', 'colored fabrics', 'soft cotton', 'apparel manufacture'],
    attributes: [{ key: 'Material', value: '100% Cotton' }, { key: 'Bundle Size', value: '5 Metres (Assorted)' }, { key: 'GSM', value: '150' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Premium Mulberry Silk Yarn Skeins',
    slug: 'premium-silk-skeins',
    description: 'Lustrous, long-staple mulberry silk yarn skeins dyed with eco-friendly pigments. Ideal for luxury knitting, fine lace-making, and high-end boutique hand embroidery projects.',
    price: 1600,
    purchasePrice: 750,
    stock: 150,
    sku: 'EB-APRL-05',
    categorySlug: 'apparel-textile',
    images: ['/assets/images/products/premium-silk-skeins.webp'],
    tags: ['silk yarn', 'mulberry silk', 'skeins', 'luxury embroidery'],
    attributes: [{ key: 'Material', value: '100% Mulberry Silk' }, { key: 'Grade', value: '6A Premium' }, { key: 'Thread Style', value: '2-Ply Lace' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },

  // ==================== Category 5: Export & Import ====================
  {
    name: 'Fresh Export Quality Diamond Potatoes',
    slug: 'fresh-export-potatoes',
    description: 'Bulk export-grade Diamond variety potatoes, freshly harvested, washed, and size-sorted. Packed in mesh bags and ventilated crates to ensure high quality during shipping.',
    price: 65,
    salePrice: 52,
    discountRate: 20,
    purchasePrice: 28,
    stock: 12000,
    sku: 'EB-EXIM-01',
    categorySlug: 'export-and-import',
    images: ['/assets/images/products/fresh-export-potatoes.webp'],
    tags: ['export potatoes', 'agricultural trade', 'bulk potatoes', 'fresh export'],
    attributes: [{ key: 'Variety', value: 'Diamond' }, { key: 'Grade', value: 'A Grade (45mm+)' }, { key: 'Packaging', value: 'Ventilated Crates' }],
    isFeatured: false,
    isNewArrival: false,
    isFlashSale: true
  },
  {
    name: 'Premium Hulled White Sesame Seeds',
    slug: 'premium-sesame-seeds',
    description: 'Cleaned, color-sorted, and mechanically hulled white sesame seeds. High oil content (min 50%), processed hygienically for bulk export and international culinary applications.',
    price: 250,
    purchasePrice: 130,
    stock: 6000,
    sku: 'EB-EXIM-02',
    categorySlug: 'export-and-import',
    images: ['/assets/images/products/premium-sesame-seeds.webp'],
    tags: ['sesame seeds', 'oil seeds', 'bulk export', 'hulled sesame'],
    attributes: [{ key: 'Purity', value: '99.9%' }, { key: 'Oil Content', value: 'Min 50%' }, { key: 'Moisture', value: 'Max 5.5%' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: true
  },
  {
    name: 'Raw Golden Jute Fiber Bundle',
    slug: 'raw-jute-fiber-bundle',
    description: 'Premium quality raw Tossa jute fiber bundles with strong tensile strength, long fiber length, and a bright golden color. Prepared and baled for eco-friendly textile industries worldwide.',
    price: 160,
    salePrice: 128,
    discountRate: 20,
    purchasePrice: 75,
    stock: 9000,
    sku: 'EB-EXIM-03',
    categorySlug: 'export-and-import',
    images: ['/assets/images/products/raw-jute-fiber-bundle.webp'],
    tags: ['raw jute', 'golden fiber', 'bulk jute export', 'eco friendly fiber'],
    attributes: [{ key: 'Grade', value: 'Tossa Grade-A' }, { key: 'Fiber Length', value: '1.8m - 2.5m' }, { key: 'Packaging', value: 'Standard Bales' }],
    isFeatured: false,
    isNewArrival: true,
    isFlashSale: false
  },
  {
    name: 'Premium Green Cardamom Pods',
    slug: 'fresh-green-cardamom',
    description: 'Premium export-grade whole green cardamom pods, sorted by size. Features a deep green color, full seed count, and intensely rich camphoraceous aroma. Ideal for premium spice markets.',
    price: 2900,
    purchasePrice: 1500,
    stock: 450,
    sku: 'EB-EXIM-04',
    categorySlug: 'export-and-import',
    images: ['/assets/images/products/fresh-green-cardamom.webp'],
    tags: ['green cardamom', 'spices trade', 'import spices', 'premium pods'],
    attributes: [{ key: 'Pod Size', value: '8.5mm' }, { key: 'Origin', value: 'Imported Grade-A' }, { key: 'Packaging', value: 'Vacuum Packed Bags' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  },
  {
    name: 'Export Quality Whole Dried Red Chillies',
    slug: 'export-dried-red-chillies',
    description: 'Hygienically sun-dried whole red chillies with high capsaicin content and deep red coloration. Completely stemless, moisture-controlled, and vacuum packed for international shipping.',
    price: 390,
    purchasePrice: 210,
    stock: 4000,
    sku: 'EB-EXIM-05',
    categorySlug: 'export-and-import',
    images: ['/assets/images/products/export-dried-red-chillies.webp'],
    tags: ['dried chillies', 'spices export', 'hot peppers', 'stemless chilli'],
    attributes: [{ key: 'Moisture', value: 'Max 9.5%' }, { key: 'Stem', value: 'Stemless' }, { key: 'Capsaicin Content', value: 'High' }],
    isFeatured: true,
    isNewArrival: false,
    isFlashSale: false
  }
];

async function seed() {
  try {
    try {
      await mongoose.connect(mongodbUri);
    } catch (connErr) {
      console.log('SRV connection failed, trying direct connection fallback...');
      const directUri = 'mongodb://EuropeBangla:xI2QuBaFZsYQ5vRD@ac-jrowhop-shard-00-00.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-01.e5n1hnl.mongodb.net:27017,ac-jrowhop-shard-00-02.e5n1hnl.mongodb.net:27017/EuropeBangla?ssl=true&authSource=admin';
      await mongoose.connect(directUri);
    }
    console.log('Connected to MongoDB successfully.');

    // Clear existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing products.`);

    // Query all categories
    const categoriesList = await Category.find({});
    console.log(`Fetched ${categoriesList.length} categories from DB.`);

    const categoryMap = {};
    categoriesList.forEach(c => {
      categoryMap[c.slug] = c._id;
    });

    // Prepare products with proper Category ObjectIds
    const finalProducts = productsData.map(p => {
      const categoryId = categoryMap[p.categorySlug];
      if (!categoryId) {
        throw new Error(`Category with slug "${p.categorySlug}" not found in DB! Seed categories first.`);
      }
      const pCopy = { ...p };
      pCopy.categories = [categoryId];
      delete pCopy.categorySlug;
      return pCopy;
    });

    // Insert new products
    const insertResult = await Product.insertMany(finalProducts);
    console.log(`Seeded ${insertResult.length} products successfully:`);
    insertResult.forEach((prod, i) => {
      console.log(`[Product ${i + 1}] Name: "${prod.name}", SKU: "${prod.sku}"`);
    });

  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
