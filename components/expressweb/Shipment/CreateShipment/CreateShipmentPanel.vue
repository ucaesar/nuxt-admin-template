<template>
    <v-expansion-panel>
        <v-expansion-panel-header>创建运单</v-expansion-panel-header>
        <v-expansion-panel-content>
            <v-window v-model="step">
                <v-window-item :value="1">
                    <sender-address-form @next="step++" />
                </v-window-item>
                <v-window-item :value="2">
                    <receiver-address-form />
                </v-window-item>
            </v-window>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

import SenderAddressForm from './SenderAddressForm.vue';
import ReceiverAddressForm from './ReceiverAddressForm.vue';

@Component({
    components: {
        SenderAddressForm,
        ReceiverAddressForm
    }
})
class CreateShipmentPanel extends Vue {
    step = 1;
}

export default CreateShipmentPanel;
</script>

<style>
</style>