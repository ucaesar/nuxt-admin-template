<template>
    <div>This is Role Manager Page. {{ roles }}</div>
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