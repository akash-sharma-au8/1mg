const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi
} = require('../controllers/payment')

const { isUserAuthenticated } = require('../Middlewares/auth')

router.post('/payment/process',isUserAuthenticated, processPayment);
router.get('/stripeapi',isUserAuthenticated, sendStripApi);

module.exports = router;