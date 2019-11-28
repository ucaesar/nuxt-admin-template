<template>
    <v-container>
        <resource-group-table
            new-action
            delete-action
            edit-action
            select-action
            :value="selected"
            @input="onSelect"
        />
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import ResourceGroupTable from '@/components/superadmin/ResourceGroup/ResourceGroupTable.vue';

@Component({
    layout: 'admin',
    components: {
        ResourceGroupTable
    }
})
class ResourceGroupManager extends Vue {
    selected = [];
    onSelect(items) {
        this.selected = items;
    }
}
export default ResourceGroupManager;
</script>

<style>
</style>