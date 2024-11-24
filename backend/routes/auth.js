import express from "express";
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/users.js";
const JWT_SECRET = "kunalis@goodboy";
const router = express.Router();
import fetchuser from'../middleware/fetchuser.js';
router.get('/',async(req,res)=>{
  res.send('Auth is working')
})
router.post("/signup", async (req, res) => {
  let success = false;
  try {
    // Check if the email already exists
    let email = await User.findOne({ email: req.body.email+'@gmail.com'});
    // If email is found, return a conflict response
    if (email) {
      return res.status(400).json({
        success: success,
        error: "Sorry, email ID already exists.",
      });
    } else {
      // If email does not exist, proceed to hash password and create the user
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: `${req.body.email}@gmail.com`,
        password: secpass,
        phone: req.body.phone,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        hno: req.body.hno,
        pincode: req.body.pincode,
      });

      // Save the new user
      await user.save();
      success = true;
      res.status(200).json({ success, message: "You are successfully registered" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});

let validateSignin=[
body("password")
.trim()
.isLength({min: 8,})
.withMessage("password must be atleast 8 characters"),

body("email")
.trim()
.isEmail()
.withMessage("Enter a valid email")
]
router.post(
  "/login",validateSignin,
  async (req, res) => {
    let success=false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ error:errors.array()});
      }
      const { email, password } = req.body;
      let user = await User.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Enter correct email credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (passwordCompare) {
        const data = {
            user: {
              id: user._id,
            },
          };
            success=true;
          const authtoken = jwt.sign(data, JWT_SECRET);
          res.status(201).json({success:success,authtoken:authtoken,message:"Logged in Successfully"});
      } else {
        success=false;
        return res.status(400).json({ success,error: "Enter correct password!" });
      }
    } catch (error) {
      res.status(500).send("Internel server error!"+error);
    }
  }
);
router.post("/getuser",fetchuser,async(req,res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password -_id");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error!");
  }
})
export default router;