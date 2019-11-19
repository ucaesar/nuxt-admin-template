import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export const DEFAULT_ITEMS_PER_PAGE = 10;

export interface ITableDataFromServer {
    results: any[];
    total: number;
}

interface IPageOptions {
    page: number;
    itemsPerPage: number;
}
export class TableDataFromServer implements ITableDataFromServer {
    results = [];
    total = 0;
    $axios = getNuxtAxiosInstance();

    async read(url: string, pageOptions: IPageOptions) {
        let { page, itemsPerPage } = pageOptions;

        try {
            Object.assign(
                this,
                await this.$axios.$get(url, {
                    params: {
                        start: (page - 1) * itemsPerPage,
                        count: itemsPerPage
                    }
                })
            );
        } catch (e) {
            throw e;
        }
    }
}
