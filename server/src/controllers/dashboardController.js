// Owner: M4
const Product = require('../models/Product');
const Store = require('../models/Store');
const Order = require('../models/Order');

// Helper to determine target store
const resolveStore = async (req) => {
  let store = null;
  if (req.user && req.user.store) {
    store = await Store.findById(req.user.store);
  } else if (req.user && req.user._id) {
    store = await Store.findOne({ owner: req.user._id });
  }

  if (!store && req.headers['x-store-id']) {
    store = await Store.findById(req.headers['x-store-id']);
  }

  if (!store && req.query.storeId) {
    store = await Store.findById(req.query.storeId);
  }

  // Fallback for standalone testing/dev
  if (!store) {
    store = await Store.findOne();
  }

  return store;
};

// GET /api/dashboard/stats
exports.getStats = async (req, res, next) => {
  try {
    const store = await resolveStore(req);
    if (!store) {
      return res.status(404).json({ message: 'No store found for this account' });
    }

    const storeId = store._id;

    const [
      totalProducts,
      activeProducts,
      inactiveProducts,
      outOfStockProducts,
      lowStockProducts,
      recentProducts,
      orders,
      categories,
    ] = await Promise.all([
      Product.countDocuments({ store: storeId }),
      Product.countDocuments({ store: storeId, isActive: true }),
      Product.countDocuments({ store: storeId, isActive: false }),
      Product.countDocuments({ store: storeId, stock: 0 }),
      Product.countDocuments({ store: storeId, stock: { $gt: 0, $lte: 5 } }),
      Product.find({ store: storeId }).sort({ createdAt: -1 }).limit(5).lean(),
      Order.find({ store: storeId }).sort({ createdAt: -1 }).limit(10).lean(),
      Product.distinct('category', { store: storeId }),
    ]);

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, ord) => {
      if (ord.status !== 'cancelled') {
        return sum + (ord.total || 0);
      }
      return sum;
    }, 0);

    const pendingOrders = orders.filter((o) => o.status === 'pending').length;

    res.json({
      success: true,
      store: {
        id: store._id,
        businessName: store.businessName,
        slug: store.slug,
        category: store.category,
        description: store.description,
        branding: store.branding,
        currency: store.currency || 'INR',
        contact: store.contact,
        features: store.features,
        status: store.status,
      },
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        lowStockProducts,
        outOfStockProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        categoryCount: categories.filter(Boolean).length,
      },
      recentProducts,
      recentOrders: orders.slice(0, 5),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/dashboard/store
exports.getStoreDetails = async (req, res, next) => {
  try {
    const store = await resolveStore(req);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    res.json({ success: true, store });
  } catch (err) {
    next(err);
  }
};

// PUT /api/dashboard/store
exports.updateStoreDetails = async (req, res, next) => {
  try {
    const store = await resolveStore(req);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const {
      businessName,
      category,
      description,
      branding,
      currency,
      contact,
      features,
      status,
    } = req.body;

    if (businessName) store.businessName = businessName.trim();
    if (category) store.category = category.trim();
    if (description !== undefined) store.description = description;
    if (currency) store.currency = currency;
    if (status) store.status = status;

    if (branding) {
      store.branding = {
        ...store.branding?.toObject?.() || store.branding || {},
        ...branding,
      };
    }

    if (contact) {
      store.contact = {
        ...store.contact?.toObject?.() || store.contact || {},
        ...contact,
      };
    }

    if (features) {
      store.features = {
        ...store.features?.toObject?.() || store.features || {},
        ...features,
      };
    }

    await store.save();

    res.json({
      success: true,
      message: 'Store settings updated successfully',
      store,
    });
  } catch (err) {
    next(err);
  }
};
