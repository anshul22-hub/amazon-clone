const functions = require('firebase-functions');
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51OjOpgSGVDCkHUB0fYrMuPE1nMzvsMrqrfnG0Rge2lhr6hmHJsVkjSLbssiZw641DqsaxXOuYjew37uxCE8fKVT100984w6YAC')

//API

// -App config
const app = express();

//- middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//- API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });

    
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});
  

// - listen commend
exports.api = functions.https.onRequest(app)

//http://127.0.0.1:5001/clone-b24e2/us-central1/api
