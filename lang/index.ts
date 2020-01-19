export default {
    locales: [
        { code: 'en', name: 'English', file: 'en/index.js' },
        { code: 'cn', name: '简体中文', file: 'cn/index.js' }
    ],
    defaultLocale: 'cn',
    lazy: true,
    langDir: 'lang/',
    vueI18n: {
        fallbackLocale: 'cn'
    },
    strategy: 'prefix_and_default'
};
