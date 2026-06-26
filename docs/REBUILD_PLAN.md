# Rebuild Plan: Professional Static Budget App

## Purpose

This document captures what the current prototype does and defines the plan for rebuilding it as a professional static web app using only HTML, CSS, and JavaScript.

The rebuilt app must remain deployable as static files and must support **GLOBAL ACCESS** by storing budget data in **Firestore or another remote datastore**. Local-only persistence is not acceptable, and `localStorage` must not be used as the primary data source because it cannot synchronize data across browsers, devices, or users.

## Current App Summary

The current app is a monthly budget spreadsheet implemented primarily in `index.html`, with visual styling in `style.css`. It uses a single-page layout with tabbed navigation, dynamically generated rows, month-specific state, auto-save behavior, and Firebase Firestore persistence.

### Current UI Structure

- Header with the app title, month selector, save indicator, and import controls.
- Primary tabs:
  - **Plan**
  - **Expenses**
  - **Budget Extract**
- Nested tabs inside the Plan area:
  - **Incoming Bills**
  - **Credit Cards**
- Loading overlay and toast notification elements for remote persistence feedback.

### Current Feature Set

#### Monthly Planning

- The app tracks budget data by `YYYY-MM` month key.
- The month selector controls which month is loaded into the UI.
- When a month has no data, selected carry-over behavior imports active credit-card installments from the previous month.
- Import controls allow copying selected categories from another saved month into the current month.

#### Planned Income

- Users can add planned income rows with:
  - source/description
  - amount
  - received checkbox
- Marking a planned income item as received creates a derived actual received-income row.
- Planned income rows can be toggled individually or through a bulk checkbox.

#### Incoming Bills

- Users can add planned bill rows with:
  - bill name
  - amount
  - due date
  - category: fixed, semi-fixed, or extra
  - paid checkbox
- Marking a bill as paid creates a derived actual expense row in the matching category.
- Planned bill rows can be toggled individually or through a bulk checkbox.

#### Credit Cards and Installments

- Users can add credit-card accounts.
- Each credit-card account can contain purchases with:
  - description
  - total amount
  - current installment number
  - total installment count
  - calculated monthly payment
  - finished-payment checkbox when the installment reaches the final payment
- Each card calculates its monthly bill from purchase installment amounts.
- Credit-card bills appear as read-only planned bills categorized as semi-fixed expenses.
- Marking a card bill as paid creates a derived semi-fixed actual expense.
- Unfinished installment purchases can carry forward to the next month with the installment number advanced.

#### Received Income

- The Expenses tab includes received income rows.
- Rows can be manually added or derived from planned income marked as received.
- The app calculates total received income.

#### Fixed, Semi-Fixed, and Extra Expenses

- The Expenses tab separates expenses into:
  - fixed expenses
  - semi-fixed expenses
  - extra expenses
- Rows can be manually added or derived from paid planned bills.
- Each category calculates its own total.
- Derived rows are read-only and linked back to the planned item that generated them.

#### Loans

- The app tracks long-lasting expenses/loans with:
  - loan name
  - amount left
  - monthly payment
  - calculated months left
  - increase amount control
- The increase control adds a value to the remaining balance.

#### Budget Extract

- The Budget Extract tab summarizes:
  - total received income
  - fixed expenses
  - semi-fixed expenses
  - total extra expenses
  - total expenses
  - final balance
- The final balance is calculated as received income minus total expenses.
- Positive and negative balances are visually differentiated.

#### Firebase/Firestore Persistence

- The current prototype initializes Firebase from a hard-coded Firebase config.
- Firestore is used as the remote datastore.
- All budget data is stored in one shared document path under the Firebase app artifact namespace.
- The app loads all budgets on startup and debounces writes after user edits.
- A shared document id is used, making the current app effectively a shared global budget file rather than a user-authenticated multi-user product.

## What Must Be Preserved

The rebuild should preserve the useful product behavior, not the current implementation shape.

- Static deployment model: plain HTML, CSS, and JavaScript only.
- Month-based budgeting and month switching.
- Planned income tracking and conversion into received income.
- Planned bills with due dates, categories, paid state, and conversion into actual expenses.
- Credit-card account tracking.
- Installment purchase tracking, monthly payment calculation, and month-to-month carry-over.
- Received income totals.
- Fixed, semi-fixed, and extra expense categories and totals.
- Loan tracking with remaining balance, monthly payment, months-left calculation, and balance increases.
- Budget extract with total income, category totals, total expenses, and final balance.
- Import/copy from previous months or selected months.
- Auto-save or clearly communicated save status.
- Remote persistence through Firestore or another remote datastore so the same data is available globally across devices.

## What Should Be Replaced

The current prototype architecture should be replaced to make the app maintainable, testable, and safer to evolve.

- Replace the single large inline module script with separate JavaScript files.
- Replace DOM-as-state patterns with a clear in-memory state model and explicit render functions.
- Replace mixed rendering, event handling, persistence, and calculations with separate modules.
- Replace hard-coded shared document behavior with a deliberate data-access strategy.
- Replace ad hoc row generation through large template strings with reusable render helpers.
- Replace implicit derived-row rebuilding with documented selectors and pure derivation functions.
- Replace unvalidated numeric and date handling with normalization and validation helpers.
- Replace all local-only persistence assumptions. `localStorage` may be used only as a non-authoritative convenience cache if needed; it must not be the primary data source.
- Replace prototype-level Firebase configuration placement with a documented static-safe configuration pattern and security rules plan.

## Global Access Requirement

GLOBAL ACCESS means a user can open the app from different devices or browsers and access the same budget data through a remote datastore.

The rebuilt app must therefore use one of these approaches:

1. **Firebase Firestore** from browser JavaScript.
2. Another hosted remote datastore with a browser-compatible API and appropriate security controls.

Local-only persistence is not acceptable. Browser storage such as `localStorage`, IndexedDB, or cookies cannot be the source of truth because those stores are device-local and do not provide global synchronization.

## Proposed New File Architecture

The app should remain framework-free and build-free. Files should be directly deployable to static hosting.

```text
/
├── index.html
├── README.md
├── docs/
│   └── REBUILD_PLAN.md
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── app.js
    ├── config.js
    ├── state.js
    ├── datastore.js
    ├── models.js
    ├── calculations.js
    ├── render.js
    ├── events.js
    ├── validation.js
    └── utils.js
```

### File Responsibilities

- `index.html`: semantic document structure, static containers, script/style references only.
- `css/base.css`: variables, reset, typography, and shared element defaults.
- `css/layout.css`: page layout, tabs, sections, grids, and table layout.
- `css/components.css`: buttons, inputs, cards, toasts, loading states, and budget extract cards.
- `css/responsive.css`: small-screen and touch-friendly behavior.
- `js/app.js`: app bootstrap and initialization sequence.
- `js/config.js`: Firebase or remote datastore configuration.
- `js/state.js`: authoritative client-side state object, state updates, and subscriptions if needed.
- `js/datastore.js`: remote load/save API, Firestore integration, error mapping, and debounce orchestration.
- `js/models.js`: default object factories and schema shape definitions.
- `js/calculations.js`: pure totals, balances, loan months, installment amounts, and derived actuals.
- `js/render.js`: DOM rendering functions that render state into UI.
- `js/events.js`: event delegation and command handlers.
- `js/validation.js`: numeric parsing, date validation, required fields, and data cleanup.
- `js/utils.js`: ids, formatting, cloning, month math, and general helpers.

## Proposed Data Model

The data model should separate user-entered records from derived totals. Totals and derived actual rows should be recalculated from source records whenever possible rather than stored as authoritative data.

### Top-Level Shape

```js
{
  version: 1,
  months: {
    "2026-06": {
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
        createdAt: "ISO timestamp",
        updatedAt: "ISO timestamp"
      }
    }
  }
}
```

### Planned Income

```js
{
  id: "income_...",
  source: "Salary",
  amount: 0,
  received: false,
  notes: ""
}
```

### Planned Bills

```js
{
  id: "bill_...",
  name: "Rent",
  amount: 0,
  dueDate: "2026-06-01",
  category: "fixed", // fixed | semiFixed | extra
  paid: false,
  sourceType: "manual", // manual | creditCard
  sourceId: null
}
```

### Credit Cards

```js
{
  id: "card_...",
  name: "Main Card",
  billPaidThisMonth: false,
  purchases: [
    {
      id: "purchase_...",
      description: "Laptop",
      totalAmount: 0,
      installmentsCurrent: 1,
      installmentsTotal: 12,
      finished: false
    }
  ]
}
```

### Manual Income

```js
{
  id: "actual_income_...",
  source: "Bonus",
  amount: 0
}
```

### Manual Expenses

```js
{
  id: "expense_...",
  description: "Groceries",
  amount: 0,
  category: "extra" // fixed | semiFixed | extra
}
```

### Loans

```js
{
  id: "loan_...",
  name: "Car Loan",
  amountLeft: 0,
  monthlyPayment: 0
}
```

### Derived Runtime Data

The following should be computed in `js/calculations.js` rather than stored as source-of-truth data:

- derived received income from planned income marked `received`
- derived expenses from planned bills marked `paid`
- derived semi-fixed credit-card bill expenses
- credit-card monthly payment per purchase
- credit-card monthly bill total
- loan months left
- income total
- fixed, semi-fixed, and extra totals
- total expenses
- final balance
- budget extract view model

## Remote Datastore Plan

### Recommended Option: Firestore

Firestore is the preferred datastore because the current prototype already uses it and it supports browser-only static apps.

Recommended collection strategy:

```text
/apps/{appId}/budgets/{budgetId}/months/{monthId}
```

or, if authentication is added:

```text
/users/{userId}/budgets/{budgetId}/months/{monthId}
```

The rebuild should avoid putting all months into one large document if the app may grow. One document per month is easier to sync, validate, and recover.

### Security Strategy

The rebuild needs an explicit security model before production use:

- For a single shared budget: protect access through Firebase Authentication or a documented restricted access rule.
- For personal budgets: store records under authenticated user ids.
- Do not rely on obscurity of document ids for security.
- Treat Firebase config as public client configuration and enforce security in Firestore rules.

## Milestone Sequence

### Milestone 1: Inventory and Documentation

- Document the current prototype behavior.
- Confirm the remote datastore requirement.
- Define the replacement architecture and data model.
- Do not rewrite app behavior yet.

### Milestone 2: Static App Shell

- Create the new file layout.
- Move inline styles/scripts into standalone CSS and JS files.
- Preserve the visible product structure while removing inline JavaScript from `index.html`.

### Milestone 3: Data Model and Pure Calculations

- Implement model factories and validation helpers.
- Implement pure calculation functions for totals, balances, installments, loans, and derived records.
- Add lightweight browser-runnable test fixtures or documented manual test cases without introducing npm or a build step.

### Milestone 4: Rendering and Events

- Implement state-driven rendering for each section.
- Implement event delegation that updates state through explicit actions.
- Ensure derived rows are rendered from calculated data and not stored as primary records.

### Milestone 5: Remote Persistence

- Implement Firestore or another remote datastore adapter.
- Load selected month data from the remote datastore.
- Save edits with debounce and visible sync status.
- Handle loading, save errors, offline states, and retry behavior.
- Ensure `localStorage` is not the primary source of truth.

### Milestone 6: Month Operations

- Implement month switching.
- Implement import/copy from another month.
- Implement installment carry-over from previous month.
- Validate edge cases such as missing months, deleted cards, and completed installments.

### Milestone 7: Polish and Accessibility

- Improve keyboard accessibility and focus management.
- Add labels and accessible names for inputs and controls.
- Improve responsive table behavior for mobile screens.
- Standardize empty states, confirmations, toasts, and loading indicators.

### Milestone 8: Deployment Readiness

- Document configuration steps for the remote datastore.
- Document Firestore security rules expectations.
- Add manual QA checklist.
- Confirm the app runs from static hosting without npm, bundling, TypeScript, frameworks, or a backend server.

## Acceptance Notes

- The rebuild should preserve the budget workflow and useful calculations.
- The implementation should replace the prototype architecture with maintainable static modules.
- The finished product must use Firestore or another remote datastore for GLOBAL ACCESS.
- Local-only persistence is not acceptable.
- No app rewrite is included in this milestone; this document is the preparation plan only.
