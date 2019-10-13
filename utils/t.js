import Vue from 'vue'

const $t = sign => Vue.prototype.$nuxt.$options.i18n.t(sign)

export default $t
