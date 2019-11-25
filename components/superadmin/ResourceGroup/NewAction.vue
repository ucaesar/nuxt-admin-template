<template>
    <span>
        <v-btn color="primary" @click.stop="onNew">
            <v-icon>mdi-plus</v-icon>
            {{ $t('superadmin.resourceGroupTable.newButtonText') }}
        </v-btn>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';
import { ResourceGroup } from '@/api/superadmin/ResourceGroup';

@Component
class NewAction extends Vue {
    onNew() {
        this.$emit('edit', new ResourceGroup());
    }
}

export default NewAction;
</script>

<style>
</style>