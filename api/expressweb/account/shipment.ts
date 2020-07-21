import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';
import { IShipment } from '@/models/expressweb/Shipment';

export interface IAddress {
    name: string;
    country: string;
    province: string;
    city: string;
}

export interface IShipmentItem {
    trackno: string;
    fee: {
        currency: string;
        amount: number;
    };
    createdAt: string;
    senderAddress: IAddress;
    receiverAddress: IAddress;
}

export interface ITimeline {
    Type: string;
    DateOrTimestamp: string;
}

export interface IShipmentDetails extends IShipment {
    labels: string[];
    timelines: ITimeline[];
}

function getBaseUrl() {
    return '/api/shipment';
}

export async function $delete(shipment: IShipmentItem) {
    const url = getBaseUrl() + `/${shipment.trackno}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$delete(url);
}

export async function $list(
    paginationParams?: IPaginationParams
): Promise<ITableDataFromServer> {
    const url = getBaseUrl();
    const $axios = getNuxtAxiosInstance();

    const config = paginationParams ? { params: paginationParams } : {};
    const serverData: ITableDataFromServer = await $axios.$get(url, config);

    return serverData;
}

export function $add() {}

export function $edit() {}

export async function $detail(
    shipment: IShipmentItem
): Promise<IShipmentDetails> {
    const url = getBaseUrl() + `/${shipment.trackno}`;
    const $axios = getNuxtAxiosInstance();

    const ret = await $axios.$get(url);
    return ret;
}
