// Owner: M1  (schema agreed with M2, M3, M4 -- change via PR only)
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Basic info (M2 form)
    businessName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true }, // used in /store/:slug
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '', maxlength: 1000 },

    // Branding (applied dynamically by M3's storefront)
    branding: {
      logo: { type: String, default: '' }, // image URL
      primaryColor: { type: String, default: '#111827' },
      secondaryColor: { type: String, default: '#f3f4f6' },
      accentColor: { type: String, default: '#2563eb' },
      banners: [{ type: String }], // image URLs
    },

    // Settings
    currency: { type: String, default: 'INR' }, // ISO code, e.g. INR, USD
    contact: {
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
    },

    // Features the client asked for
    features: {
      payments: { type: Boolean, default: false },
      reviews: { type: Boolean, default: false },
      wishlist: { type: Boolean, default: false },
      coupons: { type: Boolean, default: false },
    },

    status: { type: String, enum: ['draft', 'active', 'suspended'], default: 'active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);
