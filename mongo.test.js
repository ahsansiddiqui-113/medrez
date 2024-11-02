import mongoose from 'mongoose';


const username = "ahsansiddiqui";
const password = "Ahsan_Password_1903";

const dbURI = `mongodb+srv://${username}:${password}@cluster0.osqy2nd.mongodb.net/Medrez`;

async function connectToMongoDB() {
  try {
    await mongoose.connect(dbURI);
    console.log("MongoDB connected to Medrez database successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectToMongoDB();
