module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    //'no-use-before-define': 'off',
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'max-len': ['error', { 'code': 120 }],
  },
  'globals': {
    'fetch': false
  }
};
