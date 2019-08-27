module.exports = {
  plugins: ['react'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended'
  ],
  rules: {
    'react/prop-types': 0,
    'max-len': ['warn', { code: 90 }],
    'import/no-default-export': "error"
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
