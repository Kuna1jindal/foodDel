import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  hno: { type:String, required: true },
  pincode:{type:String}
});

// Define and export the model
const User = mongoose.model("User", UserSchema);
export default User;