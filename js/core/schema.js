window.App = window.App || {};

window.App.VIEWS = Object.freeze([
  'dashboard',
  'planner',
  'expenses',
  'cards',
  'loans',
  'extract',
  'settings',
]);

window.App.VIEW_LABELS = Object.freeze({
  dashboard: 'Dashboard',
  planner: 'Planner',
  expenses: 'Expenses',
  cards: 'Credit Cards',
  loans: 'Loans',
  extract: 'Extract',
  settings: 'Settings',
});

window.App.createInitialState = function createInitialState() {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  return {
    currentView: 'dashboard',
    currentMonth: month,
    sync: {
      status: 'not-connected',
      message: 'Remote datastore not connected yet',
    },
    isLoading: false,
  };
};
