import { $t } from '@/utils/NuxtOptions';

export const RESOURCE_TABLE_HEADER_TEXT = {
    get name() {
        return {
            text: $t('superadmin.resourceTable.nameHeaderText'),
            value: 'name',
            sortable: false,
            width: '200px'
        };
    },
    get action() {
        return {
            text: $t('superadmin.resourceTable.actionHeaderText'),
            value: 'action',
            sortable: false,
            width: '150px'
        };
    },
    get url() {
        return {
            text: $t('superadmin.resourceTable.urlHeaderText'),
            value: 'url',
            sortable: false
        };
    },
    get descripton() {
        return {
            text: $t('superadmin.resourceTable.descriptionHeaderText'),
            value: 'description',
            sortable: false
        };
    }
};
