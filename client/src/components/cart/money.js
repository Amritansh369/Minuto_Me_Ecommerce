// Owner: M5
export const formatMoney = (amount, currency = 'INR') => {
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount || 0);
  } catch {
    return `${currency} ${Number(amount || 0).toFixed(2)}`;
  }
};

export const statusColors = {
  pending: '#d97706',
  confirmed: '#2563eb',
  shipped: '#7c3aed',
  delivered: '#059669',
  cancelled: '#dc2626',
};

export const card = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: 12,
  padding: 20,
};

export const button = (disabled) => ({
  padding: '12px 20px',
  borderRadius: 8,
  border: 'none',
  background: disabled ? '#9ca3af' : '#111827',
  color: '#fff',
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
});

export const page = { maxWidth: 1000, margin: '0 auto', padding: '32px 16px' };
