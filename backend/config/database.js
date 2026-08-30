const mongoose = require('mongoose');
require('dotenv').config();


exports.connectDB = () => {

    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, 
        socketTimeoutMS: 45000,
    })
        .then(() => {
            console.log('Database connected succcessfully');
        })
        .catch(error => {
            console.log(`Error while connecting server with Database`);
            console.log(error);
            throw error; 
        })
};

