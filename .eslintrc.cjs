module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    test: 'readonly',
    expect: 'readonly',
    describe: 'readonly',
    beforeEach: 'readonly',
    afterEach: 'readonly'
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
