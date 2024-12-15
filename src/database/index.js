import mongoose from "mongoose";

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Failed to connect to MongoDB"));
};

export default connectToDB;
