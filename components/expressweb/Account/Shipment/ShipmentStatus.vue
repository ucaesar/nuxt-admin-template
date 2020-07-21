<template>
    <v-timeline dense clipped>
        <v-timeline-item v-for="(timeline, index) in timelines" :key="index">
            <v-card flat>
                <v-card-title>
                    {{
                        $t(
                            'expressweb.account.shipment.statusText["' +
                                `${timeline.Type}` +
                                '"]'
                        )
                    }}
                </v-card-title>
                <v-card-text>
                    {{ dateText(timeline.DateOrTimestamp) }}
                </v-card-text>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { ITimeline } from '@/api/expressweb/account/shipment';

@Component
class ShipmentStatus extends Vue {
    @Prop({ type: Array, required: true }) readonly timelines!: ITimeline[];

    dateText(dataString) {
        return new Date(Date.parse(dataString)).toLocaleString(
            this.$i18n.locale
        );
    }
}

export default ShipmentStatus;
</script>

<style>
</style>