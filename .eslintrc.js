module.exports = {
  plugins: ['react'],
  extends: ['standard', 'plugin:react/recommended'],
  rules: {
    'react/prop-types': 0
  },
  env: {
    browser: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
