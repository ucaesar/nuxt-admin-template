module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:prettier/recommended'],
  plugins: ['html', 'prettier'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    'nuxt/no-cjs-in-config': 'off',

    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',

    quotes: [
      2,
      'single',
      {
        avoidEscape: true, // 允许包含单引号的字符串使用双引号
        allowTemplateLiterals: true // 允许使用模板字符串
      }
    ],
    indent: 'off',
    'space-before-function-paren': 'off',
    'no-tabs': 'off',
    'no-unneeded-ternary': 'off',
    'arrow-parens': 'off',

    'unicorn/throw-new-error': 'off'
  }
}
