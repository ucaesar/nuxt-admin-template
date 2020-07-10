import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';
import { IRole } from '@/api/superadmin/Role';

export interface IUser {
    id: number;
    username: string;
    roles?: IRole[];
}

export class User implements IUser {
    id = -1;
    username = '';
    roles = [];
}

function getBaseUrl() {
    return '/api/user';
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

export async function $detail(user: IUser): Promise<User> {
    const url = getBaseUrl() + `/${user.id}`;
    const $axios = getNuxtAxiosInstance();
    const result: User = await $axios.$get(url);

    return result;
}

export async function $edit(user: IUser) {
    const url = getBaseUrl() + `/${user.id}`;
    const $axios = getNuxtAxiosInstance();

    await $axios.$put(url, user);
}
