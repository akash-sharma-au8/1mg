const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments 
exports.processPayment = async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

}

// Send stripe API Key 
exports.sendStripApi = async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
    })

}