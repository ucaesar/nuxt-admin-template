import { $t } from '@/utils/NuxtOptions';

export const RESOURCEGROUP_TABLE_HEADER_TEXT = {
    get groupname() {
        return {
            text: $t('superadmin.resourceGroupTable.groupNameHeaderText'),
            value: 'groupname',
            sortable: false,
            width: '300px'
        };
    },
    get description() {
        return {
            text: $t(
                'superadmin.resourceGroupTable.descriptionHeaderText'
            ),
            value: 'description',
            sortable: false
        };
    }
};
