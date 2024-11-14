import mongoose from 'mongoose';

// Define a schema for the Bill
const billSchema = new mongoose.Schema({
  custId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'user',
    required: true,
  },
  restId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'restaurent',
    required:true
  },

  items: [
    {
      itemName: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Other'],
    required: true,
  },
  billDate: {
    type: Date,
    default: Date.now,
  }
});

const bill = mongoose.model('bill', billSchema);

export default bill;
