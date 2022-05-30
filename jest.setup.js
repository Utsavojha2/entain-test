import '@testing-library/jest-dom';

global.IS_REACT_ACT_ENVIRONMENT = true;
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
