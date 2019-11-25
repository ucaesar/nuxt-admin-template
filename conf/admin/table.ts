import { $t } from '@/utils/NuxtOptions';

export const COMMON_TABLE_HEADER_TEXT = {
    get actions() {
        return {
            text: '',
            value: 'actions',
            sortable: false,
            align: 'center',
            width: '150px'
        };
    }
};
