import express from 'express';
import restaurent from '../models/restaurent.js';
import User from '../models/users.js';
import fetchuser from '../middleware/fetchuser.js';
import { body, validationResult }  from "express-validator";
const router = express.Router();
let validateRestaurent=[
    body('name')
    .trim()
    .isLength({min:5})
    .withMessage("enter name length longer than 5"),

    body('phone')
   .trim()
   .matches(/^[0-9]{10}$/) // Ensures exactly 10 digits
   .withMessage('Phone number must contain exactly 10 digits'),

];

router.post('/addRestaurent',validateRestaurent,fetchuser,async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
    else{
        let user=req.user.id;
        const userData=User.findById(user);
        const newRestaurent= new restaurent({
           name:req.body.name,
           ownerName:userData.name,
           state:req.body.state,
           city:req.body.city,
           landmark:req.body.landmark,
           phone:req.body.phone,
           redname:req.body.rdname,
           img:req.body.img,
           ownerId:userData._id 
        });
        newRestaurent.save()
        .then((rest) => {
            console.log('Restaurent added:', rest);
            res.status(500).send('Restaurent added:', rest);
          })
        .catch((err) => {
            console.error('Error adding restaurent:', err);
            res.error(err);
          });
    }

});

router.get('/chooserestaurent',fetchuser,async(req,res)=>{

    const restData=await restaurent.find({ownerId:req.user.id})
    if(restData){
        res.status(200).json(restData);
    }else{
        res.status(500).json({ error:"No retaurent found"});
    }
});
export default router;