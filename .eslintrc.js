module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        // parser: 'babel-eslint'
        parser: '@typescript-eslint/parser'
        // ecmaVersion: 6,
        // sourceType: 'module',
        // ecmaFeatures: {
        //     jsx: true
        // }
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended',
        'plugin:prettier/recommended'
    ],
    plugins: ['html', '@typescript-eslint'],
    // add your custom rules here
    rules: {
        '@typescript-eslint/no-unused-vars': 'off',

        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        'nuxt/no-cjs-in-config': 'off',

        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-newline': 'off',

        quotes: [
            2,
            'single',
            {
                avoidEscape: true, // 允许包含单引号的字符串使用双引号
                allowTemplateLiterals: true // 允许使用模板字符串
            }
        ],
        indent: 'off',
        'no-tabs': 'off',
        'no-unneeded-ternary': 'off',
        'arrow-parens': 'off',
        'space-before-function-paren': 'off',

        'unicorn/throw-new-error': 'off',
        'prettier/prettier': 'off'
    }
};
