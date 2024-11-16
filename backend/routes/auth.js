import express from "express";
import bcrypt from "bcryptjs";
import jwt from"jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/users.js";
const JWT_SECRET = "kunalis@goodboy";
const router = express.Router();
import fetchuser from'../middleware/fetchuser.js';
let validateNewUser=[
  // 1
  body("name")
  .trim()
  .isLength({ min: 3 }).withMessage("Enter a name with more than 3 letters"),
  // 2
  body("password")
  .trim()
  .isLength({min: 8})
  .withMessage("password must be atleast 8 characters"),
  // 3
  body("email")
  .trim()
  .isEmail()
  .withMessage("Enter a valid email"),
  // 4
  body('phone')
  .trim()
  .matches(/^[0-9]{10}$/) // Ensures exactly 10 digits
  .withMessage('Phone number must contain exactly 10 digits'),
  //5
  body('state')
  .trim()
  .not().isEmpty()
  .withMessage('Please enter your state'),
  //6
  body('city')
  .trim()
  .not().isEmpty()
  .withMessage('Please enter your state'),
  //7
  body('street')
  .trim()
  .not().isEmpty()
  .withMessage('Please enter your state'),
  //8
  body('hno')
  .trim()
  .not().isEmpty()
  .withMessage('Please enter your state'),
];

router.post("/createuser",validateNewUser,
  async (req, res) => {
    let success=false;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
      }
      console.log(req.body);
      let user = await User.findOne({email: req.body.email});
      if (user) {
        return res
          .status(400)
          .json({ success:success,error: "Sorry email ID is already exist."});
      } else {
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secpass,
          phone:req.body.phone,
          state:req.body.state,
          city:req.body.city,
          street:req.body.street,
          hno:req.body.hno
        });
        const data = {
          user: {
            id: user.id,
          },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authtoken});
        // res.json(user);
      }
    } catch (error) {
      console.error(success,error.message);
      res.status(500).send("Some error occured");
    }
  }
);
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
        return res.status(400).json({ success,error: "Enter correct password credentials" });
      }
    } catch (error) {
      res.status(500).send("Internel server error!"+error);
    }
  }
);
router.post("/getuser",fetchuser,async(req,res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internel server error!");
  }
})
export default router;