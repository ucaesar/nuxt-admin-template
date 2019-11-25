<template>
    <span>
        <v-btn color="primary">
            <v-icon>mdi-plus</v-icon>
            {{
                $t('superadmin.resourceGroupTable.newButtonText')
            }}
        </v-btn>
    </span>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'nuxt-property-decorator';

@Component
class NewAction extends Vue {}

export default NewAction;
</script>

<style>
</style>