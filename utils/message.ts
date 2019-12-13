import { getStore } from './NuxtOptions';

export function error(text: string) {
    const store = getStore();
    store.dispatch('message/showMessage', {
        text,
        color: 'error'
    });
}

export function success(text: string) {
    const store = getStore();
    store.dispatch('message/showMessage', {
        text,
        color: 'success'
    });
}
