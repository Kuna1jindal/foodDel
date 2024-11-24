import mongoose from 'mongoose';

// Define the FoodItem schema
const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Each food item must have a name
  },
  quantity: {
    type: Number,
    required: true,
    min: 1, // At least 1 item
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price must be non-negative
  },
});

// Define the Bill schema
const BillSchema = new mongoose.Schema(
  {
    billId: {
      type: String,
      required: true,
      unique: true, // Ensure bill IDs are unique
    },
    customerName: {
      type: String,
      required: true,
    },
    customerContact: {
      type: String,
      required: true,
    },
    foodItems: [FoodItemSchema], // Embed the FoodItem schema as an array
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0, // Default amount if not calculated yet
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Middleware to calculate totalAmount before saving
BillSchema.pre('save', function (next) {
  this.totalAmount = this.foodItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  next();
});

// Export the Bill model
const Bill = mongoose.model('Bill', BillSchema);

export default Bill;
