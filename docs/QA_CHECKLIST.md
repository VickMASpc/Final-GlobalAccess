# QA Checklist

## Static shell

- Open `index.html` directly in a browser.
- Confirm the top app header, workspace status, month selector, primary navigation, main content region, toast area, modal root, and loading state exist.
- Confirm each primary navigation button opens its placeholder view:
  - Dashboard
  - Planner
  - Expenses
  - Credit Cards
  - Loans
  - Extract
  - Settings
- Confirm keyboard users can tab to navigation and use arrow keys, Home, and End to move between views.
- Confirm the layout responds on narrow screens without horizontal page overflow.

## Constraints

- No frameworks.
- No build tools.
- No TypeScript.
- No inline JavaScript in `index.html` except module imports.
- No inline CSS.
- No Firebase persistence logic required in this milestone.
