<template>
    <div>This is Role Manager Page.</div>
</template>

<script>
export default {
    layout: 'admin',
    asyncData({ $axios }) {
        const url = '/api/roles'
        let roles = []
        try {
            roles = $axios.$get(url)
        } catch (error) {
            console.log(`error from get(${url})`, error)
        }
        return roles
    }
}
</script>

<style>
</style>