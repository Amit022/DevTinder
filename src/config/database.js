const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Amit022:Amit5386@cluster0.yq8gyfm.mongodb.net/DevTinder",
  );
};

module.exports = { connectDB };
