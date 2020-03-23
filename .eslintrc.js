'use strict';

module.exports = {
    parserOptions: {
        ecmaVersion: 7
    },
    env: {
        node: true
    },
    extends: 'eslint:recommended',
    rules: {
        semi: ['error', 'always']
    }
};