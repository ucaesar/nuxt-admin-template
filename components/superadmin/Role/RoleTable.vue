<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import CrudServerDataTable from '@/components/common/Table/CRUDServerDataTable.vue';

import { ROLE_TABLE_HEADER_TEXT } from '@/conf/superadmin/Role';

@Component({
    components: {
        CrudServerDataTable
    },
    inheritAttrs: false
})
class RoleTable extends Vue {}

export default RoleTable;
</script>

<style>
</style>