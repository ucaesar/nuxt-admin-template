<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';

import ServerDataTable from '@/components/common/ServerDataTable.vue';
import { $t } from '@/utils/NuxtOptions';

@Component
class ResourceGroupTable extends ServerDataTable {
    headers: any[] = [
        {
            text: $t('superadmin.resourceGroupManager.groupNameHeaderText'),
            value: 'groupname',
            sortable: false
        },
        {
            text: $t(
                'superadmin.resourceGroupManager.groupDescriptionHeaderText'
            ),
            value: 'description',
            sortable: false
        }
    ];
}

export default ResourceGroupTable;
</script>