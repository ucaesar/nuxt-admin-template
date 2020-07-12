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
    fee: string;
    createAt: string;
    senderAddress: IAddress;
    receiverAddress: IAddress;
}

function getBaseUrl() {
    return '/api/shipment';
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

export function $delete() {}

export function $add() {}

export function $edit() {}

export function $detail() {}
