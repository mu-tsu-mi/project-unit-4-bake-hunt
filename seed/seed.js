require('dotenv').config();
require('../config/database');
const mongoose = require('mongoose');

const Cake = require('../models/cake');
const cakeSeedData = require('./seeds-cake.json');

(async function() {
    try {
        await Cake.deleteMany({});
        await Cake.insertMany(cakeSeedData);
        
    } catch (error) {
        console.error('Error during database seeding:', error);
    } finally {
        await mongoose.connection.close();
    }
})();