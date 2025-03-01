import express from'express';
import fetchuser from '../middleware/fetchuser.js';
import Cart from'../models/cart.js';

const router=express.Router();
router.post('/addtocart',fetchuser,async(req,res)=>{
const cartitem=new Cart({
    custId:req.user.id,
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    imageURL:req.body.imageURL,
    qty:req.body.qty,
    resId:req.body.resId,
});
cartitem.save()
.then(()=>{
    res.status(200).json({message:"Item added in cart"});
})
.catch((error)=>{
    res.status(401).json({error:error})
})
});
router.get('/showcart',fetchuser,async(req,res)=>{
    Cart.find({custId:req.user.id})
    .then((data)=>{
        res.status(200).json(data);
    })
    .catch((error)=>{
        res.status(401).json({error:"PLease login first"+error});
    })

});
router.delete('/deleteone/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const itemData=await Cart.findOne({_id:id});
      const result = await Cart.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      res.status(200).json({ message: 'Data item successfully deleted',itemData:itemData });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  router.delete('/deleteall', fetchuser, async (req, res) => {
    try {
      // Validate user ID is present
      if (!req.user?.id) {
        return res.status(400).json({ error: "User ID is missing" });
      }
  
      // Attempt to delete all cart items for the user
      const result = await Cart.deleteMany({custId: req.user.id });
  
      // Send success response with count of deleted items
      res.status(200).json({
        message: `${result.deletedCount} items removed from the cart successfully`,
      });
    } catch (error) {
      // Log the error for debugging
      console.error("Error clearing cart:", error);
  
      // Send error response
      res.status(500).json({
        error: "An error occurred while clearing the cart. Please try again.",
      });
    }
  });
  
export default router;