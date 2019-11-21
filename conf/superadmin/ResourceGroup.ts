import { $t } from '@/utils/NuxtOptions';

export const RESOURCEGROUP_TABLE_HEADER_TEXT =  {
    get groupname() {
        return {
            text: $t('superadmin.resourceGroupManager.groupNameHeaderText'),
            value: 'groupname',
            sortable: false
        };
    },
    get description() {
        return {
            text: $t(
                'superadmin.resourceGroupManager.groupDescriptionHeaderText'
            ),
            value: 'description',
            sortable: false
        };
    }
};
