// Owner: M4
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

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

router.get('/', productController.getProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id/toggle-status', productController.toggleProductStatus);

module.exports = router;
