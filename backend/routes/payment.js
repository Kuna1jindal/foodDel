import express from 'express';
import { Buffer } from 'buffer';
import axios from 'axios';
import crypto from 'crypto';

const phone_pe_Host_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
const router = express.Router();
const salt_key = '96434309-7796-489d-8924-ab56988a6076';
// const salt_key='099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const merchant_id = 'PGTESTPAYUAT86';
// const merchant_id = 'PGTESTPAYUAT';

router.post('/test', async (req, res) => {
  res.status(200).json({ message: "Server is Working..." });
});

router.post('/order', async (req, res) => {
  const { name, amount, mobile, MUId, transactionId } = req.body;
  const data = {
    "merchantId": merchant_id,
    "merchantTransactionId": transactionId,
    "merchantUserId": MUId,
    "amount": amount * 100,  // Convert to paise
    "name": name,
    "redirectUrl": `http://localhost:5000/api/payment/status?id=${transactionId}`,
    "redirectMode": "Post",
    "mobileNumber": mobile,
    "paymentInstrument": {
      "type": "PAY_PAGE"
    }
  };

  const keyIndex = 1;
  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');
  const str = payloadMain + "/pg/v1/pay" + salt_key;
  const sha256 = crypto.createHash('sha256').update(str).digest('hex');
  const checksum = sha256 + '###' + keyIndex;

  try {
    const response = await axios(phone_pe_Host_url, {
      method: "POST",
      headers: {
        "accept": 'application/json',
        "Content-Type": "application/json",
        "X-VERIFY": checksum
      },
      data: {
        request: payloadMain
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Status route
router.post("/status", async (req, res) => {
  const merchantTransactionId = req.query.id;
  const merchantId = merchant_id;
  const keyIndex = 1;
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + salt_key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + "###" + keyIndex;

  const options = {
    method: 'GET',
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
      'X-MERCHANT-ID': `${merchantId}`
    }
  };

  try {
    const response = await axios.request(options);
    if (response.data.success === true) {
      const url = `http://localhost:5173/confirm`;
      return res.redirect(url);
    } else {
      const url = `http://localhost:5173/error`;
      return res.redirect(url);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
