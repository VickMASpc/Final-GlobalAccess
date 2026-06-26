export const SYNC_STATUS = Object.freeze({
  OFFLINE: 'offline',
  CONNECTING: 'connecting',
  SYNCED: 'synced',
  SAVING: 'saving',
  SAVE_FAILED: 'save-failed',
});

export const VIEWS = Object.freeze(['dashboard', 'planner', 'expenses', 'cards', 'loans', 'extract', 'settings']);

export const VIEW_LABELS = Object.freeze({
  dashboard: 'Dashboard',
  planner: 'Planner',
  expenses: 'Expenses',
  cards: 'Credit Cards',
  loans: 'Loans',
  extract: 'Extract',
  settings: 'Settings',
});

export const EXPENSE_CATEGORIES = Object.freeze(['fixed', 'semiFixed', 'extra']);

export function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getCurrentMonthId(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function createWorkspace(overrides = {}) {
  return {
    id: overrides.id || 'demo-workspace',
    name: overrides.name || 'Demo Workspace',
    ownerLabel: overrides.ownerLabel || 'Local development',
    createdAt: overrides.createdAt || new Date().toISOString(),
    updatedAt: overrides.updatedAt || new Date().toISOString(),
    ...overrides,
  };
}

export function createSession(overrides = {}) {
  return {
    userId: overrides.userId || null,
    displayName: overrides.displayName || 'Guest',
    lastWorkspaceId: overrides.lastWorkspaceId || 'demo-workspace',
    preferences: {
      reducedMotion: false,
      currency: 'USD',
      ...overrides.preferences,
    },
    ...overrides,
  };
}

export function createPlannedIncome(overrides = {}) {
  return {
    id: overrides.id || createId('planned_income'),
    source: overrides.source || '',
    amount: Number(overrides.amount) || 0,
    expectedDate: overrides.expectedDate || '',
    received: Boolean(overrides.received),
    notes: overrides.notes || '',
  };
}

export function createPlannedBill(overrides = {}) {
  return {
    id: overrides.id || createId('planned_bill'),
    name: overrides.name || '',
    amount: Number(overrides.amount) || 0,
    dueDate: overrides.dueDate || '',
    category: EXPENSE_CATEGORIES.includes(overrides.category) ? overrides.category : 'fixed',
    paid: Boolean(overrides.paid),
    sourceType: overrides.sourceType || 'manual',
    sourceId: overrides.sourceId || null,
    notes: overrides.notes || '',
  };
}

export function createActualIncome(overrides = {}) {
  return {
    id: overrides.id || createId('actual_income'),
    source: overrides.source || '',
    amount: Number(overrides.amount) || 0,
    receivedDate: overrides.receivedDate || '',
    sourceType: overrides.sourceType || 'manual',
    sourceId: overrides.sourceId || null,
  };
}

export function createExpense(overrides = {}) {
  return {
    id: overrides.id || createId('expense'),
    description: overrides.description || '',
    amount: Number(overrides.amount) || 0,
    category: EXPENSE_CATEGORIES.includes(overrides.category) ? overrides.category : 'extra',
    paidDate: overrides.paidDate || '',
    sourceType: overrides.sourceType || 'manual',
    sourceId: overrides.sourceId || null,
  };
}

export function createCreditCardPurchase(overrides = {}) {
  return {
    id: overrides.id || createId('card_purchase'),
    description: overrides.description || '',
    totalAmount: Number(overrides.totalAmount) || 0,
    installmentsCurrent: Number(overrides.installmentsCurrent) || 1,
    installmentsTotal: Number(overrides.installmentsTotal) || 1,
    purchaseDate: overrides.purchaseDate || '',
    finished: Boolean(overrides.finished),
  };
}

export function createCreditCard(overrides = {}) {
  return {
    id: overrides.id || createId('credit_card'),
    name: overrides.name || '',
    dueDay: Number(overrides.dueDay) || 1,
    billPaidThisMonth: Boolean(overrides.billPaidThisMonth),
    purchases: (overrides.purchases || []).map(createCreditCardPurchase),
  };
}

export function createLoan(overrides = {}) {
  return {
    id: overrides.id || createId('loan'),
    name: overrides.name || '',
    amountLeft: Number(overrides.amountLeft) || 0,
    monthlyPayment: Number(overrides.monthlyPayment) || 0,
    notes: overrides.notes || '',
  };
}

export function createBudgetExtractTotals(overrides = {}) {
  return {
    plannedIncomeTotal: 0,
    actualIncomeTotal: 0,
    plannedBillsTotal: 0,
    fixedExpensesTotal: 0,
    semiFixedExpensesTotal: 0,
    extraExpensesTotal: 0,
    creditCardMonthlyTotal: 0,
    loanMonthlyTotal: 0,
    totalExpenses: 0,
    finalBalance: 0,
    ...overrides,
  };
}

export function createMonthBudget(overrides = {}) {
  const id = overrides.id || getCurrentMonthId();
  return {
    id,
    plannedIncome: (overrides.plannedIncome || []).map(createPlannedIncome),
    plannedBills: (overrides.plannedBills || []).map(createPlannedBill),
    actualIncome: (overrides.actualIncome || []).map(createActualIncome),
    expenses: (overrides.expenses || []).map(createExpense),
    creditCards: (overrides.creditCards || []).map(createCreditCard),
    loans: (overrides.loans || []).map(createLoan),
    extractTotals: createBudgetExtractTotals(overrides.extractTotals),
    metadata: {
      createdAt: overrides.metadata?.createdAt || new Date().toISOString(),
      updatedAt: overrides.metadata?.updatedAt || new Date().toISOString(),
      source: overrides.metadata?.source || 'local',
    },
  };
}

export function createSeedMonth(monthId = getCurrentMonthId()) {
  return createMonthBudget({
    id: monthId,
    plannedIncome: [
      { id: 'seed_salary', source: 'Salary', amount: 5200, expectedDate: `${monthId}-01`, received: true },
      { id: 'seed_freelance', source: 'Freelance', amount: 650, expectedDate: `${monthId}-18`, received: false },
    ],
    plannedBills: [
      { id: 'seed_rent', name: 'Rent', amount: 1850, dueDate: `${monthId}-03`, category: 'fixed', paid: true },
      { id: 'seed_utilities', name: 'Utilities', amount: 240, dueDate: `${monthId}-12`, category: 'semiFixed', paid: false },
    ],
    actualIncome: [{ id: 'seed_income_received', source: 'Salary', amount: 5200, receivedDate: `${monthId}-01`, sourceType: 'planned', sourceId: 'seed_salary' }],
    expenses: [
      { id: 'seed_rent_expense', description: 'Rent', amount: 1850, category: 'fixed', sourceType: 'planned', sourceId: 'seed_rent' },
      { id: 'seed_groceries', description: 'Groceries', amount: 420, category: 'extra' },
    ],
    creditCards: [
      {
        id: 'seed_card',
        name: 'Everyday Card',
        dueDay: 20,
        billPaidThisMonth: false,
        purchases: [
          { id: 'seed_laptop', description: 'Laptop', totalAmount: 1200, installmentsCurrent: 3, installmentsTotal: 12 },
        ],
      },
    ],
    loans: [{ id: 'seed_auto_loan', name: 'Auto Loan', amountLeft: 7600, monthlyPayment: 380 }],
  });
}

export function createInitialState() {
  const currentMonth = getCurrentMonthId();
  return {
    app: {
      currentView: 'dashboard',
      currentMonth,
      isLoading: false,
      error: null,
    },
    workspace: createWorkspace(),
    session: createSession(),
    sync: {
      status: SYNC_STATUS.OFFLINE,
      message: 'Offline - sample data only',
      unsubscribeWorkspace: null,
      unsubscribeMonth: null,
    },
    months: {
      [currentMonth]: createSeedMonth(currentMonth),
    },
  };
}
