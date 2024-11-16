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
.then((data)=>{
    res.status(200).json({message:"Item added in cart"});
    console.log(data);
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
router.delete('/:id', async (req, res) => {
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
      // Attempt to delete all cart items for the user
      await Cart.deleteMany({ custId: req.user.id });
  
      // Send success response
      res.status(200).json({ message: "Cart has been cleared successfully" });
    } catch (error) {
      // Log the error for debugging
      console.error("Error clearing cart:", error);
  
      // Send error response
      res.status(402).json({ error: "An error occurred while clearing the cart" });
    }
  });
  
export default router;