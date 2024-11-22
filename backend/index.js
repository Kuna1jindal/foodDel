import express from "express";
import connectToMongo from "./db.js";
import cors from 'cors';
const app=express(); 
const port = 5000;
connectToMongo();

import authRoutes from './routes/auth.js';
import restRoutes from './routes/restaurent.js';
import services from './routes/services.js';
import payment from './routes/payment.js';

app.use(express.urlencoded({extended:false}))
app.use(express.json());
// Applying cors_policy allowing 5000 server to access 5173 port server 
app.use(cors(
  {origin:`http://localhost:${5173}`,
methods:["GET","POST","PUT","DELETE"],
allowedHeaders: ['Content-Type','authtoken']
}));
  app.get('/',async(req,res)=>{
    res.send('Food Delivery App is Working!');
  })
  app.use("/api/auth",authRoutes);
  app.use("/api/services",services);
  app.use("/api/restaurant",restRoutes);
  app.use("/api/payment",payment);

  app.listen(port,()=>{
    console.log(`Listening at http://localhost:${port}`);
})