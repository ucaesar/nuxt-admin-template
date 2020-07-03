import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { IShipment } from '@/models/expressweb/Shipment';

export interface IReturnData {
    labels?: string[];
}

function getBaseUrl() {
    return '/api/shipment/create';
}

export async function $post(data: IShipment): Promise<IReturnData> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    const ret = await $axios.$post(url, data);

    return ret;
}
