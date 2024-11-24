import express from 'express';
import { Buffer } from 'buffer';
import crypto from 'crypto';
import axios from 'axios';


const phone_pe_Host_url = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
const router = express.Router();
const salt_key = "96434309-7796-489d-8924-ab56988a6076";
const merchant_id = "PGTESTPAYUAT86";

router.get('/test', async (req, res) => {
  res.redirect('http://localhost:5173/confirm');
});

router.post('/order', async (req, res) => {
  
    const { name, amount, mobile, MUId, transactionId } = req.body;
    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      merchantUserId: MUId,
      amount: amount * 100,
      name,
      redirectUrl: `http://localhost:5000/api/payment/status?id=${transactionId}`,
      redirectMode: "POST",
      mobileNumber: mobile,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const str = payloadMain + "/pg/v1/pay" + salt_key;
    const sha256 = crypto.createHash('sha256').update(str).digest('hex');
    const checksum = sha256 + "###1";

     await axios( {

      method: 'POST',
      url:phone_pe_Host_url,
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
      },
      data: {
        request:payloadMain
      },
    }).then(response=>{
      res.status(200).json(response.data);
    })
  .catch (error=>{
    console.error('Error in /order:', error);
    res.status(500).json({ error: error.message });
  })
});

// Status route
router.post("/status", async (req, res) => {
  const merchantTransactionId = req.query.id;
  const merchantId = merchant_id;
  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  try {
     await axios(
      {
        method: 'GET',
        url:`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
          'X-MERCHANT-ID': `${merchantId}`,
        },
      }
    )
    .then(response=>{
      console.log(response);
      if(response.data.success){
        res.redirect('http://localhost:5173/confirm');
      }else{
        res.redirect('http://localhost:5173/error');
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
