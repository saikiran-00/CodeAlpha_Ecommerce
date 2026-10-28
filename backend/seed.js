const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Features comfortable over-ear design with memory foam cushions.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    stock: 25,
    rating: 4.5,
    numReviews: 128,
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health and fitness with this feature-packed smartwatch. Includes heart rate monitor, GPS, sleep tracking, and 7-day battery life. Water resistant to 50m.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    stock: 15,
    rating: 4.3,
    numReviews: 95,
  },
  {
    name: 'Classic Leather Jacket',
    description: 'Timeless genuine leather jacket with a modern fit. Features premium stitching, inner pockets, and a stylish collar. Perfect for any occasion.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Fashion',
    stock: 20,
    rating: 4.7,
    numReviews: 64,
  },
  {
    name: 'Designer Sunglasses',
    description: 'UV400 protection polarized sunglasses with a sleek aviator design. Lightweight titanium frame with anti-scratch lenses. Comes with premium carrying case.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'Accessories',
    stock: 30,
    rating: 4.2,
    numReviews: 52,
  },
  {
    name: 'Minimalist Backpack',
    description: 'Sleek, water-resistant backpack with padded laptop compartment (fits up to 15.6"), multiple organizer pockets, and ergonomic shoulder straps.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    stock: 35,
    rating: 4.6,
    numReviews: 87,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handcrafted ceramic mugs in earth tones. Microwave and dishwasher safe. 12oz capacity with comfortable handle. Perfect housewarming gift.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500',
    category: 'Home',
    stock: 40,
    rating: 4.4,
    numReviews: 73,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360° sound, 20-hour battery, and deep bass. Perfect for outdoor adventures. Pairs with up to 2 devices simultaneously.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    stock: 22,
    rating: 4.1,
    numReviews: 110,
  },
  {
    name: 'Cotton Casual T-Shirt',
    description: '100% organic cotton crew neck t-shirt. Pre-shrunk, tagless design for maximum comfort. Available in multiple colors. Machine washable.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Fashion',
    stock: 50,
    rating: 4.0,
    numReviews: 156,
  },
  {
    name: 'Scented Candle Collection',
    description: 'Set of 3 premium soy wax candles with natural essential oils. Scents include Lavender Dream, Vanilla Bean, and Ocean Breeze. 45-hour burn time each.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=500',
    category: 'Home',
    stock: 28,
    rating: 4.8,
    numReviews: 91,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled vacuum insulated bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free, leak-proof lid. 750ml capacity with powder-coated finish.',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Accessories',
    stock: 45,
    rating: 4.5,
    numReviews: 134,
  },
];

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('Error: MONGO_URI environment variable is missing.');
      process.exit(1);
    }

    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    console.log('Inserting seed products...');
    const createdProducts = await Product.insertMany(products);
    console.log(`Successfully inserted ${createdProducts.length} sample products.`);

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
};

seedData();
