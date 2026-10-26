// Owner: M4
import React, { useState } from 'react';

export default function BrandingEditor({
  store,
  onSave,
  isSaving = false,
}) {
  const [formData, setFormData] = useState({
    businessName: store?.businessName || '',
    category: store?.category || '',
    description: store?.description || '',
    currency: store?.currency || 'INR',
    branding: {
      logo: store?.branding?.logo || '',
      primaryColor: store?.branding?.primaryColor || '#111827',
      secondaryColor: store?.branding?.secondaryColor || '#f3f4f6',
      accentColor: store?.branding?.accentColor || '#2563eb',
      banners: store?.branding?.banners || [],
    },
    contact: {
      email: store?.contact?.email || '',
      phone: store?.contact?.phone || '',
      address: store?.contact?.address || '',
    },
    features: {
      payments: store?.features?.payments ?? false,
      reviews: store?.features?.reviews ?? false,
      wishlist: store?.features?.wishlist ?? false,
      coupons: store?.features?.coupons ?? false,
    },
  });

  const [bannerInput, setBannerInput] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBrandingChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      branding: { ...prev.branding, [key]: value },
    }));
  };

  const handleContactChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [key]: value },
    }));
  };

  const handleFeatureToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      features: { ...prev.features, [key]: !prev.features[key] },
    }));
  };

  const handleAddBanner = () => {
    if (!bannerInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        banners: [...prev.branding.banners, bannerInput.trim()],
      },
    }));
    setBannerInput('');
  };

  const handleRemoveBanner = (idx) => {
    setFormData((prev) => ({
      ...prev,
      branding: {
        ...prev.branding,
        banners: prev.branding.banners.filter((_, i) => i !== idx),
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(formData);
    setToastMessage('Store branding and settings updated successfully!');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const { primaryColor, secondaryColor, accentColor, logo, banners } = formData.branding;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '28px' }}>
      {/* Left Column: Settings & Customizer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* Toast Notification */}
        {toastMessage && (
          <div
            style={{
              padding: '12px 18px',
              borderRadius: '8px',
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              color: '#065f46',
              fontSize: '14px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>✓</span> {toastMessage}
          </div>
        )}

        {/* Brand Visuals (Logo & Colors) */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Store Visual Identity & Colors
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Logo URL */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Store Logo URL
              </label>
              <input
                type="url"
                value={logo}
                onChange={(e) => handleBrandingChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
            </div>

            {/* Colors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {/* Primary Color */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Primary (Headers)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                    style={{ width: '40px', height: '38px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', padding: '2px' }}
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => handleBrandingChange('primaryColor', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              {/* Secondary Color */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Secondary (Background)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                    style={{ width: '40px', height: '38px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', padding: '2px' }}
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => handleBrandingChange('secondaryColor', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                  Accent (Buttons & CTAs)
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => handleBrandingChange('accentColor', e.target.value)}
                    style={{ width: '40px', height: '38px', borderRadius: '6px', border: '1px solid #cbd5e1', cursor: 'pointer', padding: '2px' }}
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => handleBrandingChange('accentColor', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            </div>

            {/* Banners Manager */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Storefront Banner Images
              </label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <input
                  type="url"
                  placeholder="https://example.com/hero-banner.jpg"
                  value={bannerInput}
                  onChange={(e) => setBannerInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddBanner}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Add Banner
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
                {banners.map((url, i) => (
                  <div key={i} style={{ position: 'relative', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    <img src={url} alt={`Banner ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemoveBanner(i)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '11px',
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Details & Settings */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Store Details & Contact
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleBasicChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Store Currency
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleBasicChange}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
              >
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Store Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleBasicChange}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Support Email
              </label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
                Contact Phone
              </label>
              <input
                type="text"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px' }}
              />
            </div>
          </div>
        </div>

        {/* Features Checklist */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>
            Store Features
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { key: 'payments', label: 'Online Payments (Razorpay/Stripe)' },
              { key: 'reviews', label: 'Customer Reviews & Ratings' },
              { key: 'wishlist', label: 'Customer Wishlist' },
              { key: 'coupons', label: 'Discount Codes & Coupons' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#334155', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.features[key]}
                  onChange={() => handleFeatureToggle(key)}
                  style={{ width: '16px', height: '16px', accentColor: '#2563eb' }}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSaving}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#2563eb',
              color: '#fff',
              fontSize: '15px',
              fontWeight: 700,
              cursor: isSaving ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              opacity: isSaving ? 0.7 : 1,
            }}
          >
            {isSaving ? 'Saving Changes...' : 'Save Branding & Settings'}
          </button>
        </div>
      </div>

      {/* Right Column: Live Storefront Theme Simulator */}
      <div>
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '14px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b' }}>
              Live Storefront Preview
            </span>
            <span style={{ fontSize: '10px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
              M3 Storefront Preview
            </span>
          </div>

          {/* Mini Browser Window Simulator */}
          <div
            style={{
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              backgroundColor: secondaryColor,
            }}
          >
            {/* Browser Top Bar */}
            <div style={{ backgroundColor: '#1e293b', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
              <div
                style={{
                  flex: 1,
                  backgroundColor: '#0f172a',
                  borderRadius: '4px',
                  padding: '2px 8px',
                  fontSize: '10px',
                  color: '#94a3b8',
                  marginLeft: '8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                shopsphere.com/store/{store?.slug || 'my-store'}
              </div>
            </div>

            {/* Storefront Header Styled with Client's Primary Color */}
            <div
              style={{
                backgroundColor: primaryColor,
                padding: '12px 16px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {logo ? (
                  <img src={logo} alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '4px', objectFit: 'contain' }} />
                ) : (
                  <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                    {(formData.businessName || 'S').charAt(0)}
                  </div>
                )}
                <span style={{ fontSize: '13px', fontWeight: 700 }}>
                  {formData.businessName || 'My Store'}
                </span>
              </div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Cart (0)</div>
            </div>

            {/* Banner Simulator */}
            <div
              style={{
                height: '110px',
                position: 'relative',
                backgroundColor: '#cbd5e1',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {banners[0] ? (
                <img src={banners[0]} alt="Store Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center', padding: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                    Welcome to {formData.businessName || 'Our Store'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b' }}>Discover our featured collection</div>
                </div>
              )}
            </div>

            {/* Product Card Simulator using Accent Color */}
            <div style={{ padding: '12px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '10px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <div style={{ height: '70px', borderRadius: '6px', backgroundColor: '#f1f5f9', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#94a3b8' }}>
                  Product Thumbnail
                </div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#0f172a' }}>Sample Product</div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: primaryColor, marginTop: '2px' }}>
                  {formData.currency === 'USD' ? '$' : '₹'}499
                </div>
                <button
                  type="button"
                  disabled
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: accentColor,
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'default',
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
