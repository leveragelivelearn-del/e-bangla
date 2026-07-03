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
  // Fallback if env file doesn't parse correctly
  mongodbUri = 'mongodb+srv://EuropeBangla:S4Epscw0SOkd5ZtG@cluster0.e5n1hnl.mongodb.net/EuropeBangla';
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const banners = [
  {
    title: 'Define Your Style',
    image: '/assets/images/Banner/fashion.webp',
    link: '/shop?category=fashion',
    primaryBtnText: 'Shop Fashion',
    primaryBtnLink: '/shop?category=fashion',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801755677599',
    order: 1,
    isActive: true,
  },
  {
    title: 'Pure Organic Agro',
    image: '/assets/images/Banner/agro.webp',
    link: '/shop?category=agro',
    primaryBtnText: 'Browse Agro',
    primaryBtnLink: '/shop?category=agro',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801713126211',
    order: 2,
    isActive: true,
  },
  {
    title: 'Exquisite Handcrafted Art',
    image: '/assets/images/Banner/craft.webp',
    link: '/shop?category=crafts',
    primaryBtnText: 'Explore Crafts',
    primaryBtnLink: '/shop?category=crafts',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801713126211',
    order: 3,
    isActive: true,
  },
  {
    title: 'Premium Quality Fabrics',
    image: '/assets/images/Banner/apparel.webp',
    link: '/shop?category=apparel-textile',
    primaryBtnText: 'Explore Apparel',
    primaryBtnLink: '/shop?category=apparel-textile',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801713126211',
    order: 4,
    isActive: true,
  },
  {
    title: 'Global Trade Solutions',
    image: '/assets/images/Banner/exportimport.webp',
    link: '/shop?category=export-and-import',
    primaryBtnText: 'Learn More',
    primaryBtnLink: '/shop?category=export-and-import',
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: 'https://wa.me/8801713126211',
    order: 5,
    isActive: true,
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

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}"`);
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
