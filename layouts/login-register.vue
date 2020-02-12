<template>
    <v-app>
        <message />
        <v-content>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <nuxt />
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Message from '@/components/Message.vue';

@Component({
    components: {
        Message
    }
})
class LoginRegisterLayout extends Vue {}

export default LoginRegisterLayout;
</script>

<style></style>
