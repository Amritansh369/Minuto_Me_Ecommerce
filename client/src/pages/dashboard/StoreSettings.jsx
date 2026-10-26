// Owner: M4
import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import BrandingEditor from '../../components/dashboard/BrandingEditor';
import { fetchStoreSettings, updateStoreSettings } from '../../api/productApi';

export default function StoreSettings() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const loadStore = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchStoreSettings();
      if (res?.store) {
        setStore(res.store);
      }
    } catch (err) {
      console.error('Error fetching store settings:', err);
      setError('Unable to load store settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStore();
  }, []);

  const handleSave = async (formData) => {
    try {
      setSaving(true);
      const res = await updateStoreSettings(formData);
      if (res?.store) {
        setStore(res.store);
      }
    } catch (err) {
      console.error('Error updating store:', err);
      alert('Failed to update store settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Sidebar store={store} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Header */}
        <header
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Store Branding & Settings
            </h1>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              Customize your store identity, brand palette, banners, and feature options.
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={{ padding: '32px', flex: 1 }}>
          {error && (
            <div
              style={{
                padding: '14px 18px',
                borderRadius: '8px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '14px',
                marginBottom: '24px',
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
              <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid #cbd5e1', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <div style={{ marginTop: '12px' }}>Loading store settings...</div>
            </div>
          ) : (
            <BrandingEditor
              store={store}
              onSave={handleSave}
              isSaving={saving}
            />
          )}
        </div>
      </main>
    </div>
  );
}
