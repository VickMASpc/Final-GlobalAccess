export function clearModal() {
  const root = document.querySelector('#modal-root');
  if (root) root.replaceChildren();
}
