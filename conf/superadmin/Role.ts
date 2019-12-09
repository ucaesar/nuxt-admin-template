import { $t } from '@/utils/NuxtOptions';

export const ROLE_TABLE_HEADER_TEXT = {
    get name() {
        return {
            text: $t('superadmin.roleTable.nameHeaderText'),
            value: 'name',
            sortable: false,
            width: '200px'
        }
    },
    get description() {
        return {
            text: $t('superadmin.roleTable.descriptionHeaderText'),
            value: 'description',
            sortable: false
        };
    }
}