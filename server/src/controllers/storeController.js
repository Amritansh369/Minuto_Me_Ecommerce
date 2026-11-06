// Owner: M1
import Store from '../models/Store.js';
import User from '../models/User.js';

const writableFields = ['businessName', 'category', 'description', 'slug', 'currency'];
const nestedFields = {
  branding: ['logo', 'primaryColor', 'secondaryColor', 'accentColor', 'banners'],
  contact: ['email', 'phone', 'address'],
  features: ['payments', 'reviews', 'wishlist', 'coupons'],
};

function pickStoreFields(input, includeSlug = true) {
  const update = {};
  for (const field of writableFields) {
    if (field !== 'slug' || includeSlug) {
      if (Object.prototype.hasOwnProperty.call(input, field)) update[field] = input[field];
    }
  }
  for (const [group, fields] of Object.entries(nestedFields)) {
    if (!input[group] || typeof input[group] !== 'object' || Array.isArray(input[group])) continue;
    for (const field of fields) {
      if (Object.prototype.hasOwnProperty.call(input[group], field)) update[`${group}.${field}`] = input[group][field];
    }
  }
  return update;
}

function normalizeSlug(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const createStore = async (req, res, next) => {
  try {
    const input = req.body || {};
    const values = pickStoreFields(input);
    values.slug = normalizeSlug(values.slug || values.businessName);
    if (!values.businessName || !values.category || !values.slug) {
      return res.status(400).json({ message: 'Business name and category are required' });
    }
    if (values.slug.length > 80) return res.status(400).json({ message: 'Store slug must be 80 characters or fewer' });
    if (await Store.exists({ owner: req.user._id })) {
      return res.status(409).json({ message: 'Your account already has a store' });
    }

    const store = await Store.create({ ...values, owner: req.user._id });
    await User.updateOne({ _id: req.user._id }, { $set: { store: store._id } });
    return res.status(201).json({ store });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'This store URL is already in use' });
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    return next(err);
  }
};

export const getMyStore = async (req, res, next) => {
  try {
    const store = await Store.findOne({ owner: req.user._id });
    if (!store) return res.status(404).json({ message: 'Store not found' });
    return res.json({ store });
  } catch (err) {
    return next(err);
  }
};

export const updateMyStore = async (req, res, next) => {
  try {
    const update = pickStoreFields(req.body || {}, false);
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: 'Provide at least one supported store field to update' });
    }
    const store = await Store.findOneAndUpdate(
      { owner: req.user._id },
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!store) return res.status(404).json({ message: 'Store not found' });
    return res.json({ store });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: 'This store URL is already in use' });
    if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ message: err.message });
    return next(err);
  }
};
