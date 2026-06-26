import { createBudgetExtractTotals } from './schema.js';

export function sumAmounts(items = [], field = 'amount') {
  return items.reduce((total, item) => total + (Number(item[field]) || 0), 0);
}

export function getCreditCardPurchaseMonthlyPayment(purchase) {
  const installments = Math.max(Number(purchase.installmentsTotal) || 1, 1);
  return (Number(purchase.totalAmount) || 0) / installments;
}

export function getCreditCardMonthlyTotal(card) {
  return (card.purchases || []).reduce((total, purchase) => {
    if (purchase.finished) return total;
    return total + getCreditCardPurchaseMonthlyPayment(purchase);
  }, 0);
}

export function getLoanMonthsLeft(loan) {
  const amountLeft = Number(loan.amountLeft) || 0;
  const monthlyPayment = Number(loan.monthlyPayment) || 0;
  return monthlyPayment > 0 ? Math.ceil(amountLeft / monthlyPayment) : 0;
}

export function calculateBudgetExtract(month) {
  const expenses = month.expenses || [];
  const plannedIncomeTotal = sumAmounts(month.plannedIncome || []);
  const actualIncomeTotal = sumAmounts(month.actualIncome || []);
  const plannedBillsTotal = sumAmounts(month.plannedBills || []);
  const fixedExpensesTotal = sumAmounts(expenses.filter((expense) => expense.category === 'fixed'));
  const semiFixedExpensesTotal = sumAmounts(expenses.filter((expense) => expense.category === 'semiFixed'));
  const extraExpensesTotal = sumAmounts(expenses.filter((expense) => expense.category === 'extra'));
  const creditCardMonthlyTotal = (month.creditCards || []).reduce((total, card) => total + getCreditCardMonthlyTotal(card), 0);
  const loanMonthlyTotal = sumAmounts(month.loans || [], 'monthlyPayment');
  const totalExpenses = fixedExpensesTotal + semiFixedExpensesTotal + extraExpensesTotal + creditCardMonthlyTotal + loanMonthlyTotal;

  return createBudgetExtractTotals({
    plannedIncomeTotal,
    actualIncomeTotal,
    plannedBillsTotal,
    fixedExpensesTotal,
    semiFixedExpensesTotal,
    extraExpensesTotal,
    creditCardMonthlyTotal,
    loanMonthlyTotal,
    totalExpenses,
    finalBalance: actualIncomeTotal - totalExpenses,
  });
}

export function withCalculatedMonth(month) {
  return {
    ...month,
    extractTotals: calculateBudgetExtract(month),
  };
}
