import { $t } from '@/utils/NuxtOptions';

export const ROLE_TABLE_HEADER_TEXT = {
    get roleName() {
        return {
            text: $t('superadmin.roleTable.roleNameHeaderText'),
            value: 'rolename',
            sortable: false,
            width: '200px'
        };
    },
    get description() {
        return {
            text: $t('superadmin.roleTable.descriptionHeaderText'),
            value: 'description',
            sortable: false
        };
    }
};
