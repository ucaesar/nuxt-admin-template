import Vue from 'vue'

function $t(sign: string): string {
    return Vue.prototype.$nuxt.$options.i18n.t(sign)
}

export { $t }
