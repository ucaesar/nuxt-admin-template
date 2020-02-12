import { Configuration } from '@nuxt/types';
import bodyParser from 'body-parser';

import i18n from './lang';
const colors = require('vuetify/es5/util/colors').default;

const config: Configuration = {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        titleTemplate: '%s - ' + process.env.npm_package_name,
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/axios', '~/plugins/validation.ts'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module',
        '@nuxtjs/vuetify',
        '@nuxt/typescript-build'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        'nuxt-i18n',
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        baseURL: 'http://localhost:3000',
        browserBaseURL: '/'
    },
    /*
     ** i18n module configuration
     ** See https://nuxt-community.github.io/nuxt-i18n/
     */
    i18n,
    /*
     ** vuetify module configuration
     ** https://github.com/nuxt-community/vuetify-module
     */
    vuetify: {
        customVariables: [
            '~/assets/styles/variables.scss',
            '~/assets/styles/styles.scss'
        ],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        transpile: ['vee-validate/dist/rules'],
        extend(config, ctx) {},
        babel: {
            plugins: [
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
        }
    },
    typescript: {
        typeCheck: true,
        ignoreNotFoundWarnings: true
    },
    serverMiddleware: [
        bodyParser.json(),
        { path: '/', handler: '~/server/index.ts' }
    ]
};

// module.exports = config
export default config;
