// import module
import mongoose from "mongoose";

// connection
export const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("db connect successfully");
    })
    .catch((err) => {
      console.log("fail to connect to db");
    });
};
