module.exports = {
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.json'],
            },
        },
    },
    ignorePatterns: ['dist'],
    rules: {
        'max-len': ['error', { code: 150 }],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
                json: 'never',
            },
        ],
        'no-unused-vars': 'off', // Checked by typescript
        'no-param-reassign': 'off',
        'prefer-destructuring': 'off',
        'no-restricted-globals': 'off',
    },
};
