<template>
    <v-card elevation="0">
        <v-card-title>
            <v-avatar color="primary" size="36" class="mr-2">
                <span class="white--text headline">{{ step }}</span>
            </v-avatar>
            包裹信息
        </v-card-title>

        <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
                <v-card-text>
                    <package-form />
                </v-card-text>
            </v-col>
        </v-row>

        <v-card-actions>
            <v-btn text disabled>上一步</v-btn>
            <v-btn text @click="onReset">重置</v-btn>
            <v-btn color="primary" @click="onNext">下一步</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import PackageForm from '@/components/expressweb/Package/PackageForm.vue';

@Component({
    components: {
        PackageForm
    }
})
class Package extends Vue {
    @Prop({ type: Number, required: true }) readonly step!: number;

    onBack() {
        this.$emit('back', this.step - 1);
    }
    onReset() {}
    onNext() {
        this.$emit('next', {
            nextStep: this.step + 1
        })
    }
}

export default Package;
</script>

<style>
</style>