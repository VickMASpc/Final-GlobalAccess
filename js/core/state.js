window.App = window.App || {};

(function initState(App) {
  let state = App.createInitialState();
  const subscribers = new Set();

  App.getState = function getState() {
    return structuredClone(state);
  };

  App.setState = function setState(patch) {
    state = { ...state, ...patch };
    subscribers.forEach((subscriber) => subscriber(App.getState()));
  };

  App.subscribe = function subscribe(subscriber) {
    subscribers.add(subscriber);
    subscriber(App.getState());
    return () => subscribers.delete(subscriber);
  };
})(window.App);
