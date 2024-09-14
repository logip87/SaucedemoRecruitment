// eslint-disable-next-line no-undef
module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:playwright/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    ignorePatterns: ['test-results', 'playwright-report'],
    rules: {
        'max-len': ['error', { 'code': 1000, }],
        'playwright/expect-expect': 'off',
        'playwright/no-conditional-in-test': 'off',
        'playwright/no-skipped-test': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, }],
        'object-curly-spacing': ['error', 'always'],
        'indent': ['error', 4],

        'quotes': ['error', 'single'],          
        'semi': ['error', 'always'],             
        'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
        'space-before-function-paren': ['error', 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'sort-imports': ['error', {
            'allowSeparatedGroups': false,
            'ignoreDeclarationSort': true,
            'ignoreMemberSort': true,
        }]
    }
};