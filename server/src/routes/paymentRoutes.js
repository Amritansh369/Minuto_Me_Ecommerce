// Owner: M5
const express = require('express');
const { simulatePayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/:orderId/simulate', simulatePayment);

module.exports = router;
