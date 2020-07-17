<template>
    <v-dialog v-model="visible" persistent max-width="1200" scrollable>
        <template v-slot:activator="{ on }">
            <span>
                <v-icon small v-on="on">mdi-eye</v-icon>
            </span>
        </template>
        <v-card v-if="visible">
            <v-card-title class="headline">
                运单详细信息
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <shipment-details-card />
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="visible = false"
                    >Disagree</v-btn
                >
                <v-btn color="green darken-1" text @click="visible = false"
                    >Agree</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import ShipmentDetailsCard from './ShipmentDetailsCard.vue';

@Component({
    components: {
        ShipmentDetailsCard
    }
})
class WatchAction extends Vue {
    @Prop({ type: Object, required: true }) readonly item!: any;

    visible = false;

    onWatch() {}
}

export default WatchAction;
</script>

<style>
</style>