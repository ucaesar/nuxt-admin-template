import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export interface ITableDataFromServer {
    result: any[];
    total: number;
}

export interface ITableUIConf {
    loading: boolean;
    headers: any[];
    footerProps: any;
}

export const DEFAULT_ITEMS_PER_PAGE = 10;

export class TableUIConf implements ITableUIConf {
    loading = false;
    headers: any[];
    footerProps = {
        itemsPerPageOptions: [1, DEFAULT_ITEMS_PER_PAGE, 20, 50]
    };
    constructor(headers: any[]) {
        this.headers = headers;
    }
}

export class TableState {
    serverData: ITableDataFromServer;
    uiConf: ITableUIConf;
    $axios: NuxtAxiosInstance;
    readUrl: string;

    constructor(uiConf: ITableUIConf, readUrl: string) {
        this.serverData = { result: [], total: 0 };
        this.uiConf = uiConf;
        this.$axios = getNuxtAxiosInstance();
        this.readUrl = readUrl;
    }

    async loadPage({
        page,
        itemsPerPage
    }: {
        page: number;
        itemsPerPage: number;
    }) {
        this.uiConf.loading = true;
        try {
            this.serverData = await this.$axios.$get(this.readUrl, {
                params: {
                    start: (page - 1) * itemsPerPage,
                    count: itemsPerPage
                }
            });
        } catch (e) {
            throw e;
        } finally {
            this.uiConf.loading = false;
        }
    }
}
