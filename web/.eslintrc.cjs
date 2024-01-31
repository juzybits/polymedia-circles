module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'src/lib/sui-client-sdk'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-floating-promises': 'off',
        'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
        'react/no-unescaped-entities': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        react: {
            version: 'detect'
        }
    },
}
