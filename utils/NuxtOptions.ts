import Vue from 'vue';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import VueI18n from 'vue-i18n';

export function getNuxtAppOptions() {
    return Vue.prototype.$nuxt.$options;
}

export function $t(sign: string): string {
    return getNuxtAppOptions().i18n.t(sign);
}

export function getNuxtAxiosInstance(): NuxtAxiosInstance {
    return getNuxtAppOptions().$axios;
}

export function getStore() {
    return getNuxtAppOptions().store;
}

export function getI18n(): VueI18n {
    return getNuxtAppOptions().i18n;
}
