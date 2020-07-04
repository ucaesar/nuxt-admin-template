import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { IShipment } from '@/models/expressweb/Shipment';

export interface IReturnData {
    money?: {
        currency: string;
        amount: number;
    };
    error?: string;
}

function getBaseUrl() {
    return '/api/shipment/rate';
}

export async function $post(data: IShipment): Promise<IReturnData> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    const ret = await $axios.$post(url, data);

    return ret;
}
