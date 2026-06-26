import {
  createActualIncome,
  createExpense,
  createInitialState,
  createMonthBudget,
  createPlannedBill,
  createPlannedIncome,
  SYNC_STATUS,
} from './schema.js';
import { withCalculatedMonth } from './calculations.js';

let initialState = normalizeState(createInitialState());
let state = initialState;
const listeners = new Set();

function clone(value) {
  return structuredClone(value);
}

function normalizeState(nextState) {
  const months = Object.fromEntries(
    Object.entries(nextState.months || {}).map(([monthId, month]) => [monthId, withCalculatedMonth(createMonthBudget({ ...month, id: monthId }))])
  );

  return {
    ...nextState,
    months,
  };
}

function notify() {
  const snapshot = getState();
  listeners.forEach((listener) => listener(snapshot));
}

function mergeState(current, patch) {
  return normalizeState({
    ...current,
    ...patch,
    app: { ...current.app, ...patch.app },
    workspace: { ...current.workspace, ...patch.workspace },
    session: { ...current.session, ...patch.session },
    sync: { ...current.sync, ...patch.sync },
    months: patch.months ? { ...current.months, ...patch.months } : current.months,
  });
}

function updateCurrentMonth(updater) {
  const monthId = state.app.currentMonth;
  const currentMonth = state.months[monthId] || createMonthBudget({ id: monthId });
  const updatedMonth = withCalculatedMonth({
    ...updater(clone(currentMonth)),
    metadata: {
      ...currentMonth.metadata,
      updatedAt: new Date().toISOString(),
    },
  });

  state = mergeState(state, {
    months: {
      [monthId]: updatedMonth,
    },
  });
}

export function getState() {
  return clone(state);
}

export function setState(patch) {
  state = mergeState(state, patch);
  notify();
}

export function subscribe(listener) {
  listeners.add(listener);
  listener(getState());
  return () => listeners.delete(listener);
}

export function resetState(nextInitialState = createInitialState()) {
  initialState = normalizeState(nextInitialState);
  state = initialState;
  notify();
}

export function dispatch(action) {
  switch (action.type) {
    case 'app/setView':
      setState({ app: { currentView: action.view } });
      break;
    case 'app/setMonth': {
      const monthId = action.monthId;
      setState({
        app: { currentMonth: monthId },
        months: state.months[monthId] ? {} : { [monthId]: createMonthBudget({ id: monthId }) },
      });
      break;
    }
    case 'workspace/set':
      setState({ workspace: action.workspace });
      break;
    case 'sync/setStatus':
      setState({ sync: { status: action.status || SYNC_STATUS.OFFLINE, message: action.message || '' } });
      break;
    case 'month/replace':
      setState({ months: { [action.monthId]: createMonthBudget({ ...action.monthData, id: action.monthId }) } });
      break;
    case 'plannedIncome/add':
      updateCurrentMonth((month) => ({ ...month, plannedIncome: [...month.plannedIncome, createPlannedIncome(action.item)] }));
      notify();
      break;
    case 'plannedIncome/update':
      updateCurrentMonth((month) => ({
        ...month,
        plannedIncome: month.plannedIncome.map((item) => (item.id === action.id ? createPlannedIncome({ ...item, ...action.patch, id: item.id }) : item)),
      }));
      notify();
      break;
    case 'plannedBill/add':
      updateCurrentMonth((month) => ({ ...month, plannedBills: [...month.plannedBills, createPlannedBill(action.item)] }));
      notify();
      break;
    case 'actualIncome/add':
      updateCurrentMonth((month) => ({ ...month, actualIncome: [...month.actualIncome, createActualIncome(action.item)] }));
      notify();
      break;
    case 'expense/add':
      updateCurrentMonth((month) => ({ ...month, expenses: [...month.expenses, createExpense(action.item)] }));
      notify();
      break;
    default:
      console.warn(`Unhandled action: ${action.type}`);
  }
}
