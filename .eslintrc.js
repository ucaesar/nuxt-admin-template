module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        // parser: 'babel-eslint'
        parser: '@typescript-eslint/parser'
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        // 'plugin:prettier/recommended',
        'plugin:vue/recommended',
        'plugin:nuxt/recommended'
    ],
    plugins: ['vue', '@typescript-eslint'],
    // add your custom rules here
    rules: {
        'no-unused-vars': 'off',
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
        'vue/attributes-order': 'off',

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
        'lines-between-class-members': 'off',

        'unicorn/throw-new-error': 'off',
        'prettier/prettier': 'off'
    }
};
