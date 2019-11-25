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
                'superadmin.resourceGroupTable.groupDescriptionHeaderText'
            ),
            value: 'description',
            sortable: false
        };
    },
    get actions() {
        return {
            text: $t('components.table.actionsHeaderText'),
            value: 'actions',
            sortable: false,
            align: 'center',
            width: '150px'
        };
    }
};
