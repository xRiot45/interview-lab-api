// // @ts-check
// import eslint from '@eslint/js';
// import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';

// export default tseslint.config(
//     {
//         ignores: ['eslint.config.mjs', 'commitlint.config.js'],
//     },
//     eslint.configs.recommended,
//     ...tseslint.configs.recommendedTypeChecked,
//     eslintPluginPrettierRecommended,
//     eslintConfigPrettier,
//     {
//         languageOptions: {
//             globals: {
//                 ...globals.node,
//                 ...globals.jest,
//             },
//             ecmaVersion: 'latest',
//             sourceType: 'module',
//             parserOptions: {
//                 projectService: true,
//                 tsconfigRootDir: import.meta.dirname,
//             },
//         },
//     },
//     {
//         rules: {
//             '@typescript-eslint/restrict-template-expressions': 'off',
//             '@typescript-eslint/no-explicit-any': 'warn',
//             '@typescript-eslint/no-floating-promises': 'off',
//             '@typescript-eslint/no-unsafe-argument': 'warn',
//             indent: ['error', 4],
//             'prettier/prettier': [
//                 'error',
//                 {
//                     singleQuote: true,
//                     trailingComma: 'all',
//                     tabWidth: 4,
//                 },
//             ],
//         },
//     },
// );

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
    },
};
