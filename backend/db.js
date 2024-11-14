// db.js
import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/foodDelivery";  // Your MongoDB URI

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));
}

export default connectToMongo;
