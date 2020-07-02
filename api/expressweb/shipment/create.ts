import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { IShipment } from '@/models/expressweb/Shipment';

export interface IReturnType {
    labels?: string[];
}

function getBaseUrl() {
    return '/api/shipment/create';
}

export async function $post(data: IShipment): Promise<IReturnType> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    const ret = await $axios.$post(url, data);

    return ret;
}
