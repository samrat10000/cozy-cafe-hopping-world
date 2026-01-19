const mongoose = require('mongoose');
const User = require('./models/User');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB for Seeding');

        // Clear existing users to avoid duplicates
        await User.deleteMany({});
        console.log('🧹 Cleared old data');

        // Create Users
        const samrat = await new User({ name: 'Samrat', email: 'samrat@cozy.com', password: 'password123' }).save();
        const akash = await new User({ name: 'Akash', email: 'akash@cozy.com', password: 'password123' }).save();
        const bhavya = await new User({ name: 'Bhavya', email: 'bhavya@cozy.com', password: 'password123' }).save();

        // Make them friends
        samrat.friends.push(akash._id, bhavya._id);
        await samrat.save();

        console.log('🌱 Database Seeded!');
        console.log('👤 Created User: Samrat');
        console.log('👥 Created Friends: Akash, Bhavya');
        
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
