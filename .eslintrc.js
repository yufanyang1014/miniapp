module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    wx: 'wx',
    App: 'App',
    getApp: 'getApp',
    getCurrentPages: 'getCurrentPages',
    getRegExp: 'getRegExp',
    isNaN: 'isNaN',
    Component: 'Component',
    Page: 'Page',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins:['html'],
  settings:{
    'html/html-extensions': ['.wxml']
  },
  rules: {
    "no-unused-vars": ["error", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false, varsIgnorePattern: "^regeneratorRuntime" }],
    'max-len': ['error', {
      'code': 512
    }],
    'no-alert': [0],
    'no-plusplus': [0],
    // 'no-console':[0],
    'camelcase':[0],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
