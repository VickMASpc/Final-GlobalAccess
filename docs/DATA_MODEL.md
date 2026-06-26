# Data Model

The shell currently renders placeholders only. The future datastore model should keep user-authored records separate from derived totals.

## Proposed month document

```js
{
  id: '2026-06',
  plannedIncome: [],
  plannedBills: [],
  creditCards: [],
  manualIncome: [],
  manualExpenses: {
    fixed: [],
    semiFixed: [],
    extra: []
  },
  loans: [],
  metadata: {
    createdAt: 'ISO timestamp',
    updatedAt: 'ISO timestamp'
  }
}
```

## Derived values

The app should calculate totals, balances, card installment payments, loan months remaining, and budget extract values in `js/core/calculations.js` rather than storing those values as authoritative records.
