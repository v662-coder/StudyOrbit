const mongoose = require('mongoose');
require('dotenv').config();


exports.connectDB = () => {
    // BUGFIX: this function never returned its promise, so `await connectDB()`
    // in server.js would resolve immediately instead of waiting for the actual
    // connection - defeating the "connect before listening" fix. It also had
    // no connection-resilience options, so a slow/unreachable Mongo cluster
    // would hang indefinitely instead of failing fast (looks like "API
    // timeouts" from the outside).
    return mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000, // fail fast instead of hanging
        socketTimeoutMS: 45000,
    })
        .then(() => {
            console.log('Database connected succcessfully');
        })
        .catch(error => {
            console.log(`Error while connecting server with Database`);
            console.log(error);
            throw error; // let the caller (server.js) decide how to handle startup failure
        })
};

