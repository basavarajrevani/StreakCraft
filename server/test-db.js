const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

async function testDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const testUser = new User({
            name: 'Test User',
            email: `test_${Date.now()}@example.com`,
            password: 'password123'
        });

        await testUser.save();
        console.log('Test user saved successfully');

        const foundUser = await User.findOne({ email: testUser.email });
        console.log('Found user:', foundUser.email);

        await User.deleteOne({ _id: foundUser._id });
        console.log('Test user deleted');

        process.exit(0);
    } catch (err) {
        console.error('Test failed:', err);
        process.exit(1);
    }
}

testDB();
