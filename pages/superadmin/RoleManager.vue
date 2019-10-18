<template>
    <div>
        <v-btn class="mb-4" color="primary"
            ><v-icon>mdi-plus</v-icon>New Role</v-btn
        >
        <v-expansion-panels>
            <v-expansion-panel v-for="(role, i) in roles" :key="i">
                <v-expansion-panel-header>{{ role }}</v-expansion-panel-header>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    async asyncData({ $axios }) {
        const url = '/api/roles'
        let roles = []
        try {
            roles = (await $axios.$get(url)).result
        } catch (error) {
            console.log(`error from get(${url})`, error)
        }
        return { roles }
    }
}
</script>

<style>
</style>