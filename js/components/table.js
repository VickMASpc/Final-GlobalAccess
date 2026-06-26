export function createKeyValueTable(items) {
  const dl = document.createElement('dl');
  dl.className = 'key-value-list';
  items.forEach(({ label, value }) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    dl.append(dt, dd);
  });
  return dl;
}
