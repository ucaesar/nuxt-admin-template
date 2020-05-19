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
                                        :value="senderAddress.country"
                                        alias-label="发送方国家"
                                        sender
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <province-input
                                        :value="senderAddress.province"
                                        :country-code="senderAddress.country"
                                        alias-label="发送方省份"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <postcode-input
                                        :value="senderAddress.postcode"
                                        alias-label="发送方邮编"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <country-input
                                        :value="receiverAddress.country"
                                        alias-label="接收方国家"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <province-input
                                        :value="senderAddress.province"
                                        :country-code="receiverAddress.country"
                                        alias-label="接收方省份"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <postcode-input
                                        :value="receiverAddress.postcode"
                                        alias-label="接收方邮编"
                                    />
                                </v-col>
                                <v-col cols="12" md="4">
                                    <weight-input :value="weight" />
                                </v-col>
                            </v-row>
                            <v-row><v-btn color="primary">快速计算</v-btn></v-row>
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

    senderAddress = new Address();
    receiverAddress = new Address();
    weight = '';

    mounted() {
        this.senderAddress.country = 'CA';
    }
}

export default Calculator;
</script>

<style>
</style>