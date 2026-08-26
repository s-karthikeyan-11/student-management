const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            family:4
        });
        console.log("MongoDB Atlas Connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:", error)
        process.exit(1);
    }
};

module.exports = connectDB;