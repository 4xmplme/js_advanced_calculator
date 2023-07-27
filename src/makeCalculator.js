'use strict';

/**
 * Another calculator. Now the task is more difficult.
 * Create a `makeCalculator` function that returns an object that
 * has the following fields:
 *  - Methods: `add`, `subtract`, `multiply`, `divide`, `reset`, `operate`.
 *  - The `result` property is initially 0.
 *
 * How the calculator will work:
 * - Each `operate` call takes a callback and a number and sets the
 *   appropriate value to the `result` property.
 * - The `reset` method resets `result` value to 0.
 * - `add`, `subtract`, `multiply`, `divide` are passed as callbacks to
 *   `operate` method
 * - The `operate` and `reset` methods can be called in a chain.
 *
 * Example:
 * const calculator = makeCalculator();
 *
 * calculator.operate(calculator.add, 21)
 * calculator.result === 21

 * calculator.reset()
 * calculator.result === 0

 * calculator
 *  .operate(calculator.add, 10)
 *  .reset()
 *  .operate(calculator.subtract, 20)
 *  .operate(calculator.divide, 5)
 *  .operate(calculator.multiply, 7)
 *
 * calculator.result === -28
 *
 *
 * @return {object}
 */
function makeCalculator() {
  const calculator = {
    result: 0,
    add(value) {
      this.result += value;

      return this;
    },
    subtract(value) {
      this.result -= value;

      return this;
    },
    multiply(value) {
      this.result *= value;

      return this;
    },
    divide(value) {
      if (value === 0) {
        throw new Error('Dividing by 0 is not permitted!');
      }

      this.result /= value;

      return this;
    },
    validateValue(value) {
      return typeof value === 'number' && !isNaN(value);
    },
    validateOperation(operation) {
      return typeof operation === 'function';
    },
    reset() {
      if (!this.validateOperation(this.reset)) {
        throw new Error('Invalid operation!');
      }

      this.result = 0;

      return this;
    },
    operate(operation, value) {
      if (!this.validateOperation(operation)) {
        throw new Error('Invalid operation!');
      }

      if (!this.validateValue(value)) {
        throw new Error('Invalid value!');
      }

      return operation.call(this, value);
    },
  };

  return calculator;
}

module.exports = makeCalculator;
