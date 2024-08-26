export default {
  parser: 'babel-eslint',
  extends: ['prettier', 'plugin:react/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
