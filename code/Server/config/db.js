const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/darshan';
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

const connectDB = async () => {
  if (!MONGO_URI) {
    throw new Error('No MongoDB URI provided. Set MONGODB_URI in environment variables.');
  }

  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ Database connected');
      return;
    } catch (err) {
      lastError = err;
      console.error(`❌ DB connection attempt ${attempt} failed:`, err.message || err);

      if (attempt < MAX_RETRIES) {
        console.log(`⏳ Retrying in ${RETRY_DELAY_MS / 1000}s... (${attempt + 1}/${MAX_RETRIES})`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }

  console.error('🚨 All DB connection attempts failed.');
  console.error('Contact the following checklist:');
  console.error('- Ensure MongoDB is running (mongod)');
  console.error('- Correct URI in MONGODB_URI or defaults to mongodb://127.0.0.1:27017/darshan');
  console.error('- For Atlas, use mongodb+srv://...');
  throw lastError;
};

module.exports = connectDB;
