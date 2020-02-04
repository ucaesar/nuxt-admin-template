<template>
    <v-menu v-model="menu" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
            <v-btn color="primary" outlined v-on="on">
                <v-icon class="mr-2">mdi-settings</v-icon>
                {{ $t('expressweb.package.configUnitButtonLabel') }}
            </v-btn>
        </template>
        <v-card>
            <v-card-text>
                <v-list>
                    <v-subheader>{{
                        $t('expressweb.package.weightUnitLabel')
                    }}</v-subheader>
                    <v-list-item>
                        <v-radio-group
                            dense
                            row
                            :value="weightUnit"
                            @change="val => (localWeightUnit = val)"
                        >
                            <v-radio
                                :label="$t('expressweb.package.kg')"
                                value="kg"
                            />
                            <v-radio
                                :label="$t('expressweb.package.lb')"
                                value="lb"
                            />
                        </v-radio-group>
                    </v-list-item>
                    <v-divider />
                    <v-subheader>{{
                        $t('expressweb.package.dimensionUnitLabel')
                    }}</v-subheader>
                    <v-list-item>
                        <v-radio-group
                            row
                            dense
                            :value="dimensionUnit"
                            @change="val => (localDimensionUnit = val)"
                        >
                            <v-radio
                                :label="$t('expressweb.package.cm')"
                                value="cm"
                            />
                            <v-radio
                                :label="$t('expressweb.package.in')"
                                value="in"
                            />
                        </v-radio-group>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text small @click="menu = false">{{
                    $t('components.dialog.cancelButtonText')
                }}</v-btn>
                <v-btn small color="primary" @click="onUpdate">{{
                    $t('components.dialog.okButtonText')
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';

@Component
class UnitInput extends Vue {
    @Prop({ required: true }) readonly weightUnit!: string;
    @Prop({ required: true }) readonly dimensionUnit!: string;

    @Watch('menu')
    onOpenMenu(oldVal, newVal) {
        if (!oldVal && newVal) {
            this.localWeightUnit = this.weightUnit;
            this.localDimensionUnit = this.dimensionUnit;
        }
    }

    onUpdate() {
        this.$emit('input', {
            weightUnit: this.localWeightUnit,
            dimensionUnit: this.localDimensionUnit
        });
        this.menu = false;
    }

    menu = false;

    localWeightUnit;
    localDimensionUnit;
}

export default UnitInput;
</script>

<style>
</style>