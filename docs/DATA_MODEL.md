# Data Model

The app uses a one-way data flow: canonical JavaScript state is the source of truth, and views render from state. View code must never reconstruct app data by reading table rows or scraping the DOM.

## Top-level state

```js
{
  app: {
    currentView: 'dashboard',
    currentMonth: '2026-06',
    isLoading: false,
    error: null
  },
  workspace: Workspace,
  session: Session,
  sync: SyncState,
  months: {
    '2026-06': MonthBudget
  }
}
```

## Workspace

```js
{
  id: 'family-budget',
  name: 'Family Budget',
  ownerLabel: 'Shared household',
  createdAt: 'ISO timestamp',
  updatedAt: 'ISO timestamp'
}
```

Firestore path: `workspaces/{workspaceId}`.

## User/session metadata

```js
{
  userId: null,
  displayName: 'Guest',
  lastWorkspaceId: 'family-budget',
  preferences: {
    reducedMotion: false,
    currency: 'USD'
  }
}
```

`localStorage` may remember only the last workspace id and lightweight UI preferences. It is not the source of truth for budget records.

## Month budget

Firestore path: `workspaces/{workspaceId}/months/{YYYY-MM}`.

```js
{
  id: '2026-06',
  plannedIncome: PlannedIncome[],
  plannedBills: PlannedBill[],
  actualIncome: ActualIncome[],
  expenses: Expense[],
  creditCards: CreditCard[],
  loans: Loan[],
  extractTotals: BudgetExtractTotals,
  metadata: {
    createdAt: 'ISO timestamp',
    updatedAt: 'ISO timestamp',
    source: 'local | firestore'
  }
}
```

## Planned income

```js
{
  id: 'planned_income_...',
  source: 'Salary',
  amount: 5200,
  expectedDate: '2026-06-01',
  received: true,
  notes: ''
}
```

## Planned bills

```js
{
  id: 'planned_bill_...',
  name: 'Rent',
  amount: 1850,
  dueDate: '2026-06-03',
  category: 'fixed',
  paid: true,
  sourceType: 'manual',
  sourceId: null,
  notes: ''
}
```

## Actual income

```js
{
  id: 'actual_income_...',
  source: 'Salary',
  amount: 5200,
  receivedDate: '2026-06-01',
  sourceType: 'planned',
  sourceId: 'planned_income_...'
}
```

## Expenses

```js
{
  id: 'expense_...',
  description: 'Groceries',
  amount: 420,
  category: 'extra',
  paidDate: '2026-06-08',
  sourceType: 'manual',
  sourceId: null
}
```

## Credit cards

```js
{
  id: 'credit_card_...',
  name: 'Everyday Card',
  dueDay: 20,
  billPaidThisMonth: false,
  purchases: CreditCardPurchase[]
}
```

## Credit card purchases/installments

```js
{
  id: 'card_purchase_...',
  description: 'Laptop',
  totalAmount: 1200,
  installmentsCurrent: 3,
  installmentsTotal: 12,
  purchaseDate: '2026-04-10',
  finished: false
}
```

The monthly installment amount is derived as `totalAmount / installmentsTotal`.

## Loans

```js
{
  id: 'loan_...',
  name: 'Auto Loan',
  amountLeft: 7600,
  monthlyPayment: 380,
  notes: ''
}
```

Months remaining is derived as `ceil(amountLeft / monthlyPayment)`.

## Budget extract totals

```js
{
  plannedIncomeTotal: 5850,
  actualIncomeTotal: 5200,
  plannedBillsTotal: 2090,
  fixedExpensesTotal: 1850,
  semiFixedExpensesTotal: 0,
  extraExpensesTotal: 420,
  creditCardMonthlyTotal: 100,
  loanMonthlyTotal: 380,
  totalExpenses: 2750,
  finalBalance: 2450
}
```

Extract totals are calculated in `js/core/calculations.js` from canonical records and are refreshed by the store when month data changes.

## Development seed data

`js/core/schema.js` includes `createSeedMonth()` for local development. It provides sample income, bills, expenses, a credit card installment, and a loan so the shell can render meaningful state before Firestore is configured.
