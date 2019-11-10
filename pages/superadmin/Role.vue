<template>
    <v-container>
        <v-btn class="mb-4" color="primary"
            ><v-icon>mdi-plus</v-icon
            >{{ $t('superadmin.rolemanager.newRoleButtonText') }}</v-btn
        >
        <v-data-table
            :headers="headers"
            :items="roles"
            :items-per-page="5"
            class="elevation-1"
            ><template v-slot:item.action="{ item }">
                <v-icon small class="mr-2" @click="onEdit">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="onDelete">
                    mdi-delete
                </v-icon>
            </template></v-data-table
        >
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import consola from 'consola';
import { $t } from '@/utils/t';

@Component({
    layout: 'admin'
})
class RoleManager extends Vue {
    headers = [
        {
            text: $t('superadmin.rolemanager.roleNameHeaderText'),
            value: 'name',
            sortable: false
        },
        {
            text: 'Description',
            value: 'description',
            sortable: false
        },
        {
            text: 'Actions',
            value: 'action',
            sortable: false
        }
    ];

    async asyncData({ $axios }) {
        const url = '/api/roles';
        let roles = [];
        try {
            roles = (await $axios.$get(url)).result;
        } catch (error) {
            consola.error(`error from get(${url})`, error);
        }
        return { roles };
    }

    onEdit(val) {}

    onDelete() {}
}

export default RoleManager;
</script>

<style></style>
