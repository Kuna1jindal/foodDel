import mongoose from'mongoose';
const {Schema} =mongoose;
const cartSchema=new Schema({
    custId:{type:String},
    name:{type:String},
    description:{type:String},
    price:{type:Number},
    imageURL:{type:String},
    qty:{type:String},
    resId:{type:String},
    resName:{type:String}
});
export default mongoose.model('cart',cartSchema);