module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    useJSXTextNode: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react-refresh', 'import', 'folders', 'filename-rules'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '18.2.0',
    },
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/ban-ts-comment': 'off',
    'filename-rules/match': [2, { '.tsx': 'PascalCase', '.jsx': 'PascalCase' }],
    'folders/match-regex': [2, '^[a-z-@]+$', '/src/'],
    'import/order': ['error', { 'newlines-between': 'always' }],
    '@typescript-eslint/indent': ['off', 2],
    camelcase: 'off',
    'linebreak-style': [2, 'unix'],
    semi: [2, 'always'],
    curly: [2, 'multi-line'],
    'spaced-comment': [2, 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            importNames: [
              'get',
              'includes',
              'map',
              'filter',
              'isEmpty',
              'split',
            ],
            message: 'Please use the native javascript methods',
          },
          {
            name: 'lodash',
            importNames: ['default'],
            message:
              "Please don't import the entire lodash file. Use import { [method] } from 'lodash'; instead",
          },
          {
            name: '@ant-design/icons',
            message:
              'Please use FontAwesome icons (https://fontawesome.com/icons)',
          },
        ],
      },
    ],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'react/jsx-key': 'off',
    'react/display-name': ['error'],
    'brace-style': ['error', '1tbs'],
    'react/jsx-uses-vars': 1,
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-var': ['error'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts', '**/l/**'],
};
