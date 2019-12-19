import { getStore, $t } from './NuxtOptions';

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

export function axiosError(e: any) {
    /* error($t(`axios.error[${code}]`)); */
    const code = parseInt(e.response && e.response.status);
    const errorKey = `axios.error[${code}]`;
    if (errorKey) {
        error($t(errorKey));
    } else {
        error($t('axios.error.unknownError'));
    }
}

export function axiosSuccess() {
    success($t('axios.success'));
}
