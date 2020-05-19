<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Ref, namespace } from 'nuxt-property-decorator';


const adminStore = namespace('admin');

@Component({
    layout: 'admin',
    components: {
    }
})
class Page extends Vue {
    @adminStore.Mutation('SET_PAGETITLE') setPageTitle;

    mounted() {
        this.setPageTitle('Calculator');
    }
}

export default Page;
</script>

<style></style>
