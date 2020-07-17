import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';

export interface IAddress {
    name: string;
    country: string;
    province: string;
    city: string;
}

export interface IShipment {
    trackno: string;
    fee: {
        currency: string;
        amount: number;
    };
    createdAt: string;
    senderAddress: IAddress;
    receiverAddress: IAddress;
}

function getBaseUrl() {
    return '/api/shipment';
}

export async function $delete(shipment: IShipment) {
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

export function $detail() {}
