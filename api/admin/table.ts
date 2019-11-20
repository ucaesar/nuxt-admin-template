import { getNuxtAxiosInstance } from '@/utils/NuxtOptions';

export const DEFAULT_ITEMS_PER_PAGE = 10;

export interface ITableDataFromServer {
    results: any[];
    total: number;
}

export interface IPageOptions {
    page: number;
    itemsPerPage: number;
}

interface IPaginationParams {
    start: number;
    count: number;
}
export function computePaginationParams(
    pageOptions: IPageOptions
): IPaginationParams {
    let { page, itemsPerPage } = pageOptions;
    return {
        start: (page - 1) * itemsPerPage,
        count: itemsPerPage
    };
}

export class TableDataFromServer implements ITableDataFromServer {
    results: any[] = [];
    total = 0;
}
