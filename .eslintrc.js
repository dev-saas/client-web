module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 0
  },
  env: {
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
