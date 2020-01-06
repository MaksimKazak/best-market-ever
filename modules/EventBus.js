module.exports = class {
  #listeners = {};

  on(event, listener) {
    this.#listeners[event] = (this.#listeners[event] || []).concat(listener);
  }

  off(event, listener) {
    if (!this.#listeners[event]) {
      return;
    }
    const index = this.#listeners[event].indexOf(listener);
    if (index > -1) {
      this.#listeners[event].splice(index, 1);
    }
  }

  emit(event, ...args) {
    const listeners = this.#listeners[event];
    if (!listeners) {
      return;
    }
    listeners.forEach(listener => listener(...args));
  }
};