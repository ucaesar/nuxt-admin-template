import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ICalculatorData } from '@/models/expressweb/Calculator';

function getBaseUrl() {
    return '/api/expressweb/calculator';
}

export async function $post(data: ICalculatorData) {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    await $axios.$post(url, data);
}
