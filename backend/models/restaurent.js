import mongoose from "mongoose";
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  landmark: { type: String },
  rdname: { type: String, required: true },
  phone: { type: String, required: true },
  img: { type: String },
  ownerId: { type: Schema.Types.ObjectId, ref: 'user' }
});

// "restaurant" is the name of the collection in MongoDB
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
