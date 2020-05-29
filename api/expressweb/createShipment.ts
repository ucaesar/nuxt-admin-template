import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { IShipment } from '@/models/expressweb/Shipment';

function getBaseUrl() {
    return '/api/shipment/create';
}

export async function $post(data: IShipment) {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    await $axios.$post(url, data);
}
