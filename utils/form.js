import Vue from 'vue'

const $t = sign => Vue.prototype.$nuxt.$options.i18n.t(sign)

export const fieldRequired = value => {
    return !!value || $t('formValidating.error.fieldRequired')
}
