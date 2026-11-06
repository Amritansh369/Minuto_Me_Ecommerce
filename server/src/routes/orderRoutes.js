// Owner: M5
const express = require('express');
const { quoteCart } = require('../controllers/cartController');
const {
  createOrder,
  trackOrder,
  getMyOrders,
  getStoreOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

// M1's auth middleware may not be implemented yet; without it, protected routes reply 401.
let auth = null;
try {
  const m1Auth = require('../middleware/authMiddleware');
  auth = typeof m1Auth === 'function' ? m1Auth : m1Auth.protect || m1Auth.default || null;
} catch (e) {
  // Auth middleware not ready yet
}

const requireAuth = (req, res, next) =>
  auth ? auth(req, res, next) : res.status(401).json({ message: 'Authentication required' });

// Guests can check out; if a session token is present we attach the customer to the order.
const optionalAuth = (req, res, next) => {
  const hasToken = (req.cookies && req.cookies.token) || req.headers.authorization;
  return auth && hasToken ? auth(req, res, next) : next();
};

const router = express.Router();

// Storefront (public)
router.post('/quote', quoteCart);
router.post('/', optionalAuth, createOrder);
router.get('/track/:id', trackOrder);

// Customer
router.get('/my', requireAuth, getMyOrders);

// Store owner
router.get('/store', requireAuth, getStoreOrders);
router.patch('/:id/status', requireAuth, updateOrderStatus);

module.exports = router;
