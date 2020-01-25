const User = require("../models/user");
const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

exports.getTokenBraintree = async (req, res) => {
  try {
    const response = await gateway.clientToken.generate({});
    res.send(response.clientToken);
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.checkoutBraintree = async (req, res) => {
  const { paymentMethodNonce, amount } = req.body;
  try {
    const payment = await gateway.transaction.sale({
      amount,
      paymentMethodNonce,
      options: {
        submitForSettlement: true
      }
    });
    
  } catch (error) {
    res.json({ error: error.message });
  }
};
