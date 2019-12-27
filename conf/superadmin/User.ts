import { $t } from '@/utils/NuxtOptions';

export const USER_TABLE_HEADER_TEXT = {
    get username() {
        return {
            text: $t('superadmin.userTable.usernameHeaderText'),
            value: 'username',
            sortable: false
        };
    }
};
