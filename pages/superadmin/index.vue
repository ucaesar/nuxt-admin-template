<template>
    <div></div>
</template>

<script>
export default {
    layout: 'admin',
    async asyncData(context) {
        const data = await context.$axios.$get('/api/user/authnavs')
        console.log(data)
    }
}
</script>

<style></style>
