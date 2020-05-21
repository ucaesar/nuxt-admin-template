<template>
    <validation-observer ref="form" v-slot="{}">
        <v-form>
            <v-row justify="center">
                <v-col cols="12" md="8">
                    <v-card>
                        <v-card-text class="px-md-12">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <country-input
                                        :value="formData.senderAddress.country"
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.senderCountryLabel'
                                            )
                                        "
                                        sender
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <province-input
                                        :value="formData.senderAddress.province"
                                        :country-code="
                                            formData.senderAddress.country
                                        "
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.senderProvinceLabel'
                                            )
                                        "
                                        @input="
                                            val =>
                                                (formData.senderAddress.province = val)
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <postcode-input
                                        :value="formData.senderAddress.postcode"
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.senderPostcodeLabel'
                                            )
                                        "
                                        @input="
                                            val =>
                                                (formData.senderAddress.postcode = val)
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <country-input
                                        :value="
                                            formData.receiverAddress.country
                                        "
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.receiverCountryLabel'
                                            )
                                        "
                                        @input="
                                            val =>
                                                (formData.receiverAddress.country = val)
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <province-input
                                        :value="
                                            formData.receiverAddress.province
                                        "
                                        :country-code="
                                            formData.receiverAddress.country
                                        "
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.receiverProvinceLabel'
                                            )
                                        "
                                        @input="
                                            val =>
                                                (formData.receiverAddress.province = val)
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <postcode-input
                                        :value="
                                            formData.receiverAddress.postcode
                                        "
                                        :alias-label="
                                            $t(
                                                'expressweb.calculator.receiverPostcodeLabel'
                                            )
                                        "
                                        @input="
                                            val =>
                                                (formData.receiverAddress.postcode = val)
                                        "
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <weight-input
                                        :value="formData.weight"
                                        @input="val => (formData.weight = val)"
                                    />
                                </v-col>
                            </v-row>
                            <v-row
                                ><v-btn color="primary" @click="onSubmit">{{
                                    $t('expressweb.calculator.calButtonText')
                                }}</v-btn></v-row
                            >
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-form>
    </validation-observer>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import { ValidationObserver } from 'vee-validate';

import CountryInput from '@/components/expressweb/Address/CountryInput.vue';
import ProvinceInput from '@/components/expressweb/Address/ProvinceInput.vue';
import PostcodeInput from '@/components/expressweb/Address/PostcodeInput.vue';
import WeightInput from '@/components/expressweb/Package/WeightInput.vue';

import { Address } from '@/models/expressweb/Address';
import { CalculatorData } from '@/models/expressweb/Calculator';

import * as Api from '@/api/expressweb/calculator';

@Component({
    components: {
        CountryInput,
        ProvinceInput,
        PostcodeInput,
        WeightInput,
        ValidationObserver
    }
})
class Calculator extends Vue {
    @Ref('form') readonly form!: InstanceType<typeof ValidationObserver>;

    formData = new CalculatorData();

    async onSubmit() {
        const valid = await this.form.validate();
        if (valid) {
            Api.$post(this.formData);
        }
    }
}

export default Calculator;
</script>

<style>
</style>