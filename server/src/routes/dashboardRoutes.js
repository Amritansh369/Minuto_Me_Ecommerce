// Owner: M4
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Safe middleware hook for M1 authentication
let authMiddleware = (req, res, next) => next();
try {
  const m1Auth = require('../middleware/authMiddleware');
  if (typeof m1Auth === 'function') {
    authMiddleware = m1Auth;
  } else if (m1Auth && typeof m1Auth.protect === 'function') {
    authMiddleware = m1Auth.protect;
  }
} catch (e) {
  // Auth middleware not ready yet
}

router.use(authMiddleware);

router.get('/stats', dashboardController.getStats);
router.get('/store', dashboardController.getStoreDetails);
router.put('/store', dashboardController.updateStoreDetails);

module.exports = router;
