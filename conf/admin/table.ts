import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';
import { TableDataFromServer } from '~/api/admin/table';

export interface TableConf {
    headers: any[];
    loading?: boolean;
    footerPorps?: any;
}


