import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

import { ITableDataFromServer, IPaginationParams } from '@/api/admin/crudTable';

export interface IUser {
    id: number;
    username: string;
}

export class User implements IUser {
    id = -1;
    username = '';
}

function getBaseUrl() {
    return '/api/user';
}

