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
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: require('./package.json').dependencies.react
    }
  }
}
