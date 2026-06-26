export function formatCurrency(value, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(value) || 0);
}

export function formatSyncStatus(status) {
  return status.replace('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}
